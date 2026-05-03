import classNames from 'classnames'
import React, { memo, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { useDropzone } from 'react-dropzone'
import { BsCloud, BsUpload } from 'react-icons/bs'
import styles from './CustomChartLoader.module.scss'

function LoadFromFile({ loading, load }) {
  function onDrop(acceptedFiles) {
    if (acceptedFiles.length) {
      load(acceptedFiles[0])
    }
  }
  const {
    getRootProps,
    getInputProps,
    isDragReject,
    isDragAccept,
  } = useDropzone({
    disabled: loading,
    onDrop,
    accept: 'text/plain,text/javascript,.js',
    maxFiles: 1,
  })
  return (
    <div
      className={classNames(styles.dropzone, {
        [styles.reject]: isDragReject,
        [styles.accept]: isDragAccept,
      })}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      <span>{'Перетащите файл сюда или'} </span>
      <Button className={styles['browse-button']} color="primary">
        {'Обзор'}
      </Button>
      <span> {'выберите файл на компьютере'}</span>
      <div className={styles.dropin}>
        {isDragAccept && <p>{'Все файлы будут приняты'}</p>}
        {isDragReject && <p>{'Некоторые файлы будут отклонен'}ы</p>}
      </div>
    </div>
  )
}

function LoadFromString({ load, loading, placeholder }) {
  const [value, setValue] = useState('')
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        load(value)
      }}
    >
      <input
        disabled={loading}
        className="form-control mb-2"
        placeholder={placeholder}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <div className="text-right">
        <button
          type="submit"
          disabled={value.trim() === '' || loading}
          className="btn btn-primary"
          onClick={() => {}}
        >
        {'Загрузить диаграмму'}
        </button>
      </div>
    </form>
  )
}

function CustomChartLoaderForm({
  uploadCustomCharts,
  loadCustomChartsFromUrl,
  loadCustomChartsFromNpm,
  onClose,
}) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [type, setType] = useState('file')

  function handleError(e) {
    setLoading(false)
    if (e.isAbortByUser) {
      return
    }
    console.log(e)
    setError(e)
  }

  function changeImportType(type) {
    setError(null)
    setType(type)
  }

  return (
    <div className="row" style={{ minHeight: 300 }}>
      <div className="col-md-4">
        <div
          onClick={() => {
            changeImportType('file')
          }}
          className={classNames(
            'd-flex align-items-center cursor-pointer',
            styles.loadingOption,
            {
              [styles.active]: type === 'file',
            }
          )}
        >
          <BsUpload className="w-25" />
          <h4 className="m-0 d-inline-block">{'Загрузить из файла'}</h4>
        </div>
        <div
          onClick={() => changeImportType('url')}
          className={classNames(
            'd-flex align-items-center cursor-pointer',
            styles.loadingOption,
            {
              [styles.active]: type === 'url',
            }
          )}
        >
          <BsCloud className="w-25" />
          <h4 className="m-0 d-inline-block">{'Импорт из URL'}</h4>
        </div>
      </div>
      <div className="col-md-8">
        {type === 'url' && (
          <LoadFromString
            loading={loading}
            load={(url) => {
              setError(null)
              setLoading(true)
              loadCustomChartsFromUrl(url).then(onClose, handleError)
            }}
            key="url"
            placeholder={'Загрузить UMD или AMD JS-файл из URL'}
          />
        )}
        {type === 'file' && (
          <LoadFromFile
            loading={loading}
            load={(url) => {
              setError(null)
              setLoading(true)
              uploadCustomCharts(url).then(onClose, handleError)
            }}
            key="url"
            placeholder={'Загрузить UMD или AMD JS-файл из URL'}
          />
        )}
        {error && (
          <div className="alert alert-danger mt-2">
            {'Ошибка при импорте пользовательской диаграммы'}
          </div>
        )}
      </div>
    </div>
  )
}

function CustomChartLoader({ isOpen, onClose, ...props }) {
  return (
    <Modal
      show={isOpen}
      onHide={onClose}
      backdrop="static"
      centered
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      className="raw-modal"
      contentClassName="bg-white"
    >
      <Modal.Header closeButton>
        <Modal.Title>{'Загрузить пользовательскую диаграмму'}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <CustomChartLoaderForm {...props} onClose={onClose} />
      </Modal.Body>
    </Modal>
  )
}

export default memo(CustomChartLoader)
