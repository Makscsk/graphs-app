import React, { useState, useMemo, useCallback } from 'react'
import classNames from 'classnames'
import { Row, Col, Card, Dropdown } from 'react-bootstrap'
import { BsLink, BsPlus, BsFillTrashFill } from 'react-icons/bs'
import uniq from 'lodash/uniq'
import styles from './ChartSelector.module.scss'
import { translateChartMetadata } from './chartMetadataTranslations'

function filterCharts(charts, filter) {
  return filter === 'Все диаграммы'
    ? charts
    : charts.filter((d) => d.metadata.categories.indexOf(filter) !== -1)
}

function ChartSelector({
  availableCharts,
  currentChart,
  setCurrentChart,
  onRemoveCustomChart,
  onAddChartClick,
}) {
  const [filter, setFilter] = useState('Все диаграммы')

  const translatedCharts = useMemo(
    () => availableCharts.map(translateChartMetadata),
    [availableCharts]
  )

  const charts = useMemo(() => {
    return filterCharts(translatedCharts, filter)
  }, [translatedCharts, filter])

  const handleFilterChange = useCallback(
    (nextFilter) => {
      setFilter(nextFilter)
      const nextCharts = filterCharts(translatedCharts, nextFilter)
      if (
        nextCharts.findIndex(
          (c) => c.metadata.id === currentChart.metadata.id
        ) === -1
      ) {
        setCurrentChart(nextCharts[0])
      }
    },
    [translatedCharts, currentChart, setCurrentChart]
  )

  const translatedCurrentChart = useMemo(
    () =>
      availableCharts.find((c) => c.metadata.id === currentChart?.metadata.id),
    [availableCharts, currentChart]
  )
  const displayCurrentChart = translateChartMetadata(translatedCurrentChart)

  return (
    <>
      <Row>
        <Col className="text-right">
          {'Показать'}
          <Dropdown className="d-inline-block ml-2 raw-dropdown">
            <Dropdown.Toggle variant="white" className="pr-5">
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item
                key={'Все диаграммы'}
                onClick={() => handleFilterChange('Все диаграммы')}
              >
                {'Все диаграммы'}
              </Dropdown.Item>
              {uniq(
                availableCharts.map((d) => d.metadata.categories).flat()
              ).map((d) => {
                return (
                  <Dropdown.Item key={d} onClick={() => handleFilterChange(d)}>
                    {d.charAt(0).toUpperCase() + d.slice(1)}
                  </Dropdown.Item>
                )
              })}
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>
      <Row>
        <Col xs={3} className="pt-3">
          {displayCurrentChart && (
            <Card className={styles.currentChart}>
              <Card.Img
                variant="top"
                src={displayCurrentChart.metadata.thumbnail}
              />
              <Card.Body>
                <Card.Title className="m-0">
                  <h2 className="m-0">{displayCurrentChart.metadata.name}</h2>
                </Card.Title>
                <Card.Subtitle className="m-0">
                  <h4 className="mb-2">
                    {displayCurrentChart.metadata.category}
                  </h4>
                </Card.Subtitle>
                <Card.Text>
                  {displayCurrentChart.metadata.description}
                </Card.Text>
                {/* ссылки и т.д. */}
              </Card.Body>
            </Card>
          )}
        </Col>
        <Col>
          <Row>
            {charts.map((d, i) => {
              return (
                <Col xs={4} key={'chart-' + i} className={`p-3`}>
                  <Card
                    onClick={() => {
                      setCurrentChart(d)
                    }}
                    className={classNames('flex-row h-100 cursor-pointer', {
                      active: d === currentChart ? 'active' : '',
                      [styles.customChart]: !!d.rawCustomChart,
                    })}
                  >
                    <div
                      className={`h-100 w-25 ${styles.thumbnail}`}
                      style={{ backgroundImage: `url("${d.metadata.icon}")` }}
                    ></div>
                    <Card.Body className="w-75 px-2 py-3">
                      <Card.Title className="m-0">
                        <h2 className="m-0" style={{ whiteSpace: 'nowrap' }}>
                          {d.metadata.name}
                        </h2>
                        {d.rawCustomChart && (
                          <div>
                            <button
                              style={{
                                position: 'absolute',
                                top: -8,
                                right: -8,
                              }}
                              className="btn btn-sm btn-primary"
                              onClick={(e) => {
                                e.stopPropagation()
                                onRemoveCustomChart(d)
                              }}
                            >
                              <BsFillTrashFill />
                            </button>
                            <small
                              style={{
                                maxWidth: '100%',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                display: 'block',
                                whiteSpace: 'nowrap',
                              }}
                            >
                              {d.rawCustomChart.source}
                            </small>
                          </div>
                        )}
                      </Card.Title>
                      <Card.Subtitle className="m-0">
                        <h4 className="m-0">
                          {d.metadata.categories
                            .join(', ')
                            .charAt(0)
                            .toUpperCase() +
                            d.metadata.categories.join(', ').slice(1)}
                        </h4>
                      </Card.Subtitle>
                    </Card.Body>
                  </Card>
                </Col>
              )
            })}
            <Col xs={4} className={`p-3`}>
              <Card
                onClick={() => {
                  onAddChartClick()
                }}
                className={classNames('flex-row h-100 cursor-pointer py-2')}
              >
                <div className="d-flex align-items-center justify-content-center w-25">
                  <BsPlus size={50} color="var(--primary)" />
                </div>
                <Card.Body className="w-75 px-2 py-3">
                  <Card.Title className="m-0">
                    <h2 className="m-0" style={{ whiteSpace: 'nowrap' }}>
                      {'Загрузить диаграмму'}
                    </h2>
                  </Card.Title>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  )
}

export default React.memo(ChartSelector)
