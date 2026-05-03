import { get } from 'lodash'
import React, { useCallback, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import {
  BsArrowCounterclockwise,
  BsArrowRepeat,
  BsClipboard,
  BsCloud,
  BsFolder,
  BsGift,
  BsSearch,
  BsUpload,
} from 'react-icons/bs'
import { DATA_LOADER_MODE } from '../../hooks/useDataLoader'
import DataGrid from '../DataGrid/DataGrid'
import JsonViewer from '../JsonViewer'
import ParsingOptions from '../ParsingOptions'
import styles from './DataLoader.module.scss'
import LoadProject from './loaders/LoadProject'
import Paste from './loaders/Paste'
import UploadFile from './loaders/UploadFile'
import UrlFetch from './loaders/UrlFetch'
import Loading from './loading'
import WarningMessage from '../WarningMessage'
import DataMismatchModal from './DataMismatchModal'
import { tsvFormat } from 'd3-dsv'
import { CopyToClipboardButton } from '../CopyToClipboardButton'

function DataLoader({
  userInput,
  setUserInput,
  userData,
  userDataType,
  parseError,
  unstackedColumns,
  separator,
  setSeparator,
  thousandsSeparator,
  setThousandsSeparator,
  decimalsSeparator,
  setDecimalsSeparator,
  locale,
  setLocale,
  stackDimension,
  dataSource,
  data,
  loading,
  coerceTypes,
  loadSample,
  handleInlineEdit,
  handleStackOperation,
  setJsonData,
  resetDataLoader,
  dataLoaderMode,
  startDataReplace,
  cancelDataReplace,
  commitDataReplace,
  replaceRequiresConfirmation,
  hydrateFromProject,
}) {
  const [loadingError, setLoadingError] = useState()
  const [initialOptionState, setInitialOptionState] = useState(null)

  const options = [
    {
      id: 'paste',
      name: 'Вставьте данные',
      loader: (
        <Paste
          userInput={userInput}
          setUserInput={(rawInput) => setUserInput(rawInput, { type: 'paste' })}
          setLoadingError={setLoadingError}
        />
      ),
      message:
        'Копируйте и вставляйте свои данные из других приложений или веб-сайтов. Вы можете использовать табличные (TSV, CSV-файлы, DSV-файлы в формате DSV) или JSON-данные.',
      icon: BsClipboard,
      allowedForReplace: true,
    },
    {
      id: 'upload',
      name: 'Загрузите файл',
      loader: (
        <UploadFile
          userInput={userInput}
          setUserInput={(rawInput) =>
            setUserInput(rawInput, { type: 'upload' })
          }
          setLoadingError={setLoadingError}
        />
      ),
      message: 'Вы можете загружать табличные (TSV, CSV, DSV-файлы) или JSON-данные.',
      icon: BsUpload,
      allowedForReplace: true,
    },
    {
      id: 'url',
      name: 'Из URL',
      message:
        'Введите веб-адрес (URL), указывающий на данные (например, публичный файл Dropbox, публичный API и т. д.). Убедитесь, что сервер поддерживает CORS.',
      loader: (
        <UrlFetch
          userInput={userInput}
          setUserInput={(rawInput, source) => setUserInput(rawInput, source)}
          setLoadingError={setLoadingError}
          initialState={
            initialOptionState?.type === 'url' ? initialOptionState : null
          }
        />
      ),
      icon: BsSearch,
      disabled: false,
      allowedForReplace: true,
    },
    {
      id: 'project',
      name: 'Открыть проект',
      message: 'Загрузите файл проекта .rawgraphs.',
      loader: (
        <LoadProject
          onProjectSelected={hydrateFromProject}
          setLoadingError={setLoadingError}
        />
      ),
      icon: BsFolder,
      allowedForReplace: false,
    },
  ]
  const [optionIndex, setOptionIndex] = useState(0)
  const selectedOption = options[optionIndex]

  let mainContent
  if (userData && data) {
    mainContent = (
      <DataGrid
        userDataset={userData}
        dataset={data.dataset}
        errors={data.errors}
        dataTypes={data.dataTypes}
        coerceTypes={coerceTypes}
        onDataUpdate={handleInlineEdit}
      />
    )
  } else if (userDataType === 'json' && userData === null) {
    mainContent = (
      <JsonViewer
        context={JSON.parse(userInput)}
        selectFilter={(ctx) => Array.isArray(ctx)}
        onSelect={(ctx, path) => {
          setJsonData(ctx, path)
        }}
      />
    )
  } else if (loading && !data) {
    mainContent = <Loading />
  } else {
    mainContent = (
      <>
        {selectedOption.loader}
        <p className="mt-3">
          {selectedOption.message}
        </p>
      </>
    )
  }

  function parsingErrors(data) {
    const errors = get(data, 'errors', [])
    const successRows = data.dataset.length - errors.length
    const row = errors[0].row + 1
    const column = Object.keys(errors[0].error)[0]
    return (
      <span>
        Ой, проверьте <span className="font-weight-bold">строку {row}</span> в колонке{' '}
        <span className="font-weight-bold">{column}</span>.{' '}
        {errors.length === 2 && (
          <>
            {' '}
            Есть ещё одна проблема в строке{' '}
            <span className="font-weight-bold">{errors[1].row + 1}</span>.{' '}
          </>
        )}
        {errors.length > 2 && (
          <>
            {' '}
            Проблемы найдены ещё в{' '}
            <span className="font-weight-bold">{errors.length - 1}</span> строках.{' '}
          </>
        )}
        {successRows > 0 && (
          <>
            Оставшиеся{' '}
            <span className="font-weight-bold">
              {successRows} строк{successRows > 1 && <>и</>}
            </span>{' '}
            выглядят нормально.
          </>
        )}
      </span>
    )
  }

  const reloadRAW = useCallback(() => {
    window.location.replace(window.location.pathname)
  }, [])

  const copyToClipboardButton = !!userData ? (
    <CopyToClipboardButton content={tsvFormat(userData)} />
  ) : null

  return (
    <>
      <Row>
        {!userData && (
          <Col
            xs={3}
            lg={2}
            className="d-flex flex-column justify-content-start pl-3 pr-0 options"
          >
            {options
              .filter((opt) => {
                return (
                  dataLoaderMode !== DATA_LOADER_MODE.REPLACE ||
                  opt.allowedForReplace
                )
              })
              .map((d, i) => {
                const classnames = [
                  'w-100',
                  'd-flex',
                  'align-items-center',
                  'user-select-none',
                  'cursor-pointer',
                  styles['loading-option'],
                  d.disabled ? styles['disabled'] : null,
                  d.id === selectedOption.id && !userDataType
                    ? styles.active
                    : null,
                  userDataType ? styles.disabled : null,
                ]
                  .filter((c) => c !== null)
                  .join(' ')
                return (
                  <div
                    key={d.id}
                    className={classnames}
                    onClick={() => {
                      setOptionIndex(i)
                    }}
                  >
                    <d.icon className="w-25" />
                    <h4 className="m-0 d-inline-block">{d.name}</h4>
                  </div>
                )
              })}

            {dataLoaderMode === DATA_LOADER_MODE.REPLACE && (
              <>
                <div className="divider mb-3 mt-0" />
                <div
                  className={`w-100 mb-2 d-flex justify-content-center align-items-center ${styles['start-over']} user-select-none cursor-pointer`}
                  onClick={reloadRAW}
                >
                  <BsArrowRepeat className="mr-2" />
                  <h4 className="m-0 d-inline-block">{'Сброс'}</h4>
                </div>

                <div
                  className={`w-100 d-flex justify-content-center align-items-center ${styles['start-over']} ${styles['cancel']} user-select-none cursor-pointer mb-3`}
                  onClick={() => {
                    cancelDataReplace()
                  }}
                >
                  <h4 className="m-0 d-inline-block">{'Отмена'}</h4>
                </div>
              </>
            )}
          </Col>
        )}
        {userData && (
          <Col
            xs={3}
            lg={2}
            className="d-flex flex-column justify-content-start pl-3 pr-0 options"
          >
            <ParsingOptions
              locale={locale}
              setLocale={setLocale}
              separator={separator}
              setSeparator={setSeparator}
              thousandsSeparator={thousandsSeparator}
              setThousandsSeparator={setThousandsSeparator}
              decimalsSeparator={decimalsSeparator}
              setDecimalsSeparator={setDecimalsSeparator}
              dimensions={data ? unstackedColumns || data.dataTypes : []}
              stackDimension={stackDimension}
              setStackDimension={handleStackOperation}
              userDataType={userDataType}
              dataSource={dataSource}
              onDataRefreshed={(rawInput) => setUserInput(rawInput, dataSource)}
            />

            <div className="divider mb-3 mt-0" />

            <div
              className={`w-100 mb-2 d-flex justify-content-center align-items-center ${styles['start-over']} user-select-none cursor-pointer`}
              onClick={reloadRAW}
            >
              <BsArrowRepeat className="mr-2" />
              <h4 className="m-0 d-inline-block">{'Сброс'}</h4>
            </div>

            <div
              className={`w-100 d-flex justify-content-center align-items-center ${styles['start-over']} user-select-none cursor-pointer`}
              onClick={() => {
                setInitialOptionState(dataSource)
                const dataSourceIndex = options.findIndex(
                  (opt) => opt.id === dataSource?.type
                )
                setOptionIndex(Math.max(dataSourceIndex, 0))
                startDataReplace()
              }}
            >
              <BsArrowCounterclockwise className="mr-2" />
              <h4 className="m-0 d-inline-block">{'Заменить данные'}</h4>
            </div>
          </Col>
        )}
        <Col>
          <Row className="h-100">
            <Col className="h-100">
              {mainContent}

              {data && !parseError && get(data, 'errors', []).length === 0 && (
                <WarningMessage
                  variant="success"
                  message={
                    <span>
                      <span className="font-weight-bold">
                        {data.dataset.length} строк
                      </span>{' '}
                      (
                      {data.dataset.length * Object.keys(data.dataTypes).length}{' '}
                      ячеек) успешно разобраны, теперь можно выбрать диаграмму!
                    </span>
                  }
                  action={copyToClipboardButton}
                />
              )}

              {parseError && (
                <WarningMessage
                  variant="danger"
                  message={parseError}
                  action={copyToClipboardButton}
                />
              )}

              {get(data, 'errors', []).length > 0 && (
                <WarningMessage
                  variant="warning"
                  message={parsingErrors(data)}
                  action={copyToClipboardButton}
                />
              )}

              {loadingError && (
                <WarningMessage
                  variant="danger"
                  message={loadingError}
                  action={copyToClipboardButton}
                />
              )}
            </Col>
          </Row>
        </Col>
      </Row>
      {replaceRequiresConfirmation && (
        <DataMismatchModal
          replaceRequiresConfirmation={replaceRequiresConfirmation}
          commitDataReplace={commitDataReplace}
          cancelDataReplace={cancelDataReplace}
        />
      )}
    </>
  )
}

export default React.memo(DataLoader)
