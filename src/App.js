import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react'
import {
  getOptionsConfig,
  getDefaultOptionsValues,
  deserializeProject,
} from '@rawgraphs/rawgraphs-core'
import Section from './components/Section'
import Footer from './components/Footer'
import ScreenSizeAlert from './components/ScreenSizeAlert'
import DataLoader from './components/DataLoader'
import ChartSelector from './components/ChartSelector'
import DataMapping from './components/DataMapping'
import ChartPreviewWithOptions from './components/ChartPreviewWithOptions'
import Exporter from './components/Exporter'
import get from 'lodash/get'
import find from 'lodash/find'
import usePrevious from './hooks/usePrevious'
import { serializeProject } from '@rawgraphs/rawgraphs-core'
import baseCharts from './charts'
import useSafeCustomCharts from './hooks/useSafeCustomCharts'
import useDataLoader from './hooks/useDataLoader'
import isPlainObject from 'lodash/isPlainObject'
import CustomChartLoader from './components/CustomChartLoader'
import CustomChartWarnModal from './components/CustomChartWarnModal'
import AnimatedBackground from './components/AnimatedBackground'
import { FaAlignJustify } from 'react-icons/fa'

function App() {
  const [
    customCharts,
    {
      toConfirmCustomChart,
      confirmCustomChartLoad,
      abortCustomChartLoad,
      uploadCustomCharts,
      loadCustomChartsFromUrl,
      loadCustomChartsFromNpm,
      importCustomChartFromProject,
      removeCustomChart,
      exportCustomChart,
    },
  ] = useSafeCustomCharts()
  const charts = useMemo(() => baseCharts.concat(customCharts), [customCharts])

  const dataLoader = useDataLoader()
  const {
    userInput,
    userData,
    userDataType,
    parseError,
    unstackedData,
    unstackedColumns,
    data,
    separator,
    thousandsSeparator,
    decimalsSeparator,
    locale,
    stackDimension,
    dataSource,
    loading,
    hydrateFromSavedProject,
  } = dataLoader

  const [currentChart, setCurrentChart] = useState(charts[0])
  const [mapping, setMapping] = useState({})
  const [visualOptions, setVisualOptions] = useState(() => {
    const options = getOptionsConfig(charts[0]?.visualOptions)
    return getDefaultOptionsValues(options)
  })
  const [rawViz, setRawViz] = useState(null)
  const [mappingLoading, setMappingLoading] = useState(false)
  const dataMappingRef = useRef(null)

  const columnNames = useMemo(() => {
    if (get(data, 'dataTypes')) {
      return Object.keys(data.dataTypes)
    }
  }, [data])

  const prevColumnNames = usePrevious(columnNames)
  const clearLocalMapping = useCallback(() => {
    if (dataMappingRef.current) {
      dataMappingRef.current.clearLocalMapping()
    }
  }, [])

  const lasImportProjectRef = useRef()
  useEffect(() => {
    lasImportProjectRef.current = importProject
  })
  useEffect(() => {
    const projectUrlStr = new URLSearchParams(window.location.search).get('url')
    let projectUrl
    try {
      projectUrl = new URL(projectUrlStr)
    } catch (e) {
      return
    }
    fetch(projectUrl)
      .then((r) => (r.ok ? r.text() : Promise.reject(r)))
      .then(
        (projectStr) => {
          const project = deserializeProject(projectStr, baseCharts)
          const lastImportProject = lasImportProjectRef.current
          if (lastImportProject) {
            lastImportProject(project, true)
          }
        },
        (err) => {
          console.log(`Can't load ${projectUrl}`, err)
        }
      )
  }, [])

  useEffect(() => {
    if (prevColumnNames) {
      if (!columnNames) {
        setMapping({})
        clearLocalMapping()
      } else {
        const prevCols = prevColumnNames.join('.')
        const currentCols = columnNames.join('.')
        if (prevCols !== currentCols) {
          setMapping({})
          clearLocalMapping()
        }
      }
    }
  }, [columnNames, prevColumnNames, clearLocalMapping])

  useEffect(() => {
    if (currentChart.rawCustomChart) {
      const currentCustom = find(
        customCharts,
        (c) => c.metadata.id === currentChart.metadata.id
      )
      if (!currentCustom) {
        setCurrentChart(baseCharts[0])
        return
      }
      if (
        currentCustom.rawCustomChart.source !==
        currentChart.rawCustomChart.source
      ) {
        setCurrentChart(currentCustom)
      }
    }
  }, [customCharts, currentChart])

  const handleChartChange = useCallback(
    (nextChart) => {
      setMapping({})
      clearLocalMapping()
      setCurrentChart(nextChart)
      const options = getOptionsConfig(nextChart?.visualOptions)
      setVisualOptions(getDefaultOptionsValues(options))
      setRawViz(null)
    },
    [clearLocalMapping]
  )

  const exportProject = useCallback(async () => {
    const customChart = await exportCustomChart(currentChart)
    return serializeProject({
      userInput,
      userData,
      userDataType,
      parseError,
      unstackedData,
      unstackedColumns,
      data,
      separator,
      thousandsSeparator,
      decimalsSeparator,
      locale,
      stackDimension,
      dataSource,
      currentChart,
      mapping,
      visualOptions,
      customChart,
    })
  }, [
    currentChart,
    data,
    dataSource,
    decimalsSeparator,
    locale,
    mapping,
    parseError,
    separator,
    stackDimension,
    thousandsSeparator,
    userData,
    userDataType,
    userInput,
    visualOptions,
    unstackedColumns,
    unstackedData,
    exportCustomChart,
  ])

  const importProject = useCallback(
    async (project, fromUrl) => {
      let nextCurrentChart
      if (project.currentChart.rawCustomChart) {
        try {
          nextCurrentChart = await importCustomChartFromProject(
            project.currentChart
          )
        } catch (err) {
          if (err.isAbortByUser) {
            if (fromUrl) {
              window.history.replaceState(null, null, '/')
            }
            return
          }
          throw err
        }
      } else {
        nextCurrentChart = project.currentChart
      }
      hydrateFromSavedProject(project)
      setCurrentChart(nextCurrentChart)
      setMapping(project.mapping)
      const patchedOptions = { ...project.visualOptions }
      Object.keys(patchedOptions).forEach((k) => {
        if (isPlainObject(patchedOptions[k])) {
          patchedOptions[k].__loaded = true
        }
      })
      setVisualOptions(project.visualOptions)
    },
    [hydrateFromSavedProject, importCustomChartFromProject]
  )

  const [isModalCustomChartOpen, setModalCustomChartOpen] = useState(false)
  const toggleModalCustomChart = useCallback(
    () => setModalCustomChartOpen((o) => !o),
    []
  )

  return (
    <>
      <AnimatedBackground />
      <div className="App">
        <CustomChartWarnModal
          toConfirmCustomChart={toConfirmCustomChart}
          confirmCustomChartLoad={confirmCustomChartLoad}
          abortCustomChartLoad={abortCustomChartLoad}
        />
        <div className="app-sections">
          <Section title={`1. Загрузите данные`} loading={loading}>
            <DataLoader {...dataLoader} hydrateFromProject={importProject} />
          </Section>
          {data && (
            <Section title="2. Выберите диаграмму">
              <CustomChartLoader
                isOpen={isModalCustomChartOpen}
                onClose={toggleModalCustomChart}
                loadCustomChartsFromNpm={loadCustomChartsFromNpm}
                loadCustomChartsFromUrl={loadCustomChartsFromUrl}
                uploadCustomCharts={uploadCustomCharts}
              />
              <ChartSelector
                onAddChartClick={toggleModalCustomChart}
                onRemoveCustomChart={removeCustomChart}
                availableCharts={charts}
                currentChart={currentChart}
                setCurrentChart={handleChartChange}
              />
            </Section>
          )}
          {data && currentChart && (
            <Section title={`3. Сопоставление`} loading={mappingLoading}>
              <DataMapping
                ref={dataMappingRef}
                dimensions={currentChart.dimensions}
                dataTypes={data.dataTypes}
                mapping={mapping}
                setMapping={setMapping}
              />
            </Section>
          )}
          {data && currentChart && (
            <Section title="4. Настройка">
              <ChartPreviewWithOptions
                chart={currentChart}
                dataset={data.dataset}
                dataTypes={data.dataTypes}
                mapping={mapping}
                visualOptions={visualOptions}
                setVisualOptions={setVisualOptions}
                setRawViz={setRawViz}
                setMappingLoading={setMappingLoading}
              />
            </Section>
          )}
          {data && currentChart && rawViz && (
            <Section title="5. Экспорт">
              <Exporter rawViz={rawViz} exportProject={exportProject} />
            </Section>
          )}
          <Footer />
        </div>
        <ScreenSizeAlert />
      </div>
    </>
  )
}

export default App
