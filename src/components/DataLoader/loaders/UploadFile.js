import React, { useCallback } from 'react'
import { Button } from 'react-bootstrap'
import { useDropzone } from 'react-dropzone'
import classNames from 'classnames'
import S from './UploadFile.module.scss'

export default function UploadFile({
  setUserInput,
  setLoadingError,
}) {
  const onDrop = useCallback(
    (acceptedFiles) => {
      const reader = new FileReader()
      reader.addEventListener('load', (e) => {
        setUserInput(e.target.result)
        setLoadingError(null)
      })
      if (acceptedFiles.length) {
        reader.readAsText(acceptedFiles[0])
      }
    },
    [setLoadingError, setUserInput]
  )
  const {
    getRootProps,
    getInputProps,
    isDragReject,
    isDragAccept,
  } = useDropzone({
    onDrop,
    accept:
      'text/csv,text/plain,application/json,application/vnd.ms-excel,text/tsv,text/tab-separated-values',
    maxFiles: 1,
  })
  return (
    <div
      className={classNames(S.dropzone, {
        [S.reject]: isDragReject,
        [S.accept]: isDragAccept,
      })}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      <span>{'Перетащите файл сюда или'} </span>
      <Button className={S['browse-button']} color="primary">
        {'Обзор'}
      </Button>
      <span> {'выберите файл на компьютере'}</span>
      {isDragAccept && <p>{'Все файлы будут приняты'}</p>}
      {isDragReject && <p>{'Некоторые файлы будут отклонены'}</p>}
    </div>
  )
}
