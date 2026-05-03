import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'

function DataMismatchModal({
  replaceRequiresConfirmation,
  commitDataReplace,
  cancelDataReplace,
}) {
  const [showModal, setShowModal] = useState(true)

  const handleClose = () => {
    setShowModal(false)
  }
  return (
    <Modal
      className="raw-modal"
      show={showModal}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title as="h5">
          {'Предупреждение:'}{' '}
          {replaceRequiresConfirmation === 'parse-error' && <>{'ошибка разбора'}</>}
          {replaceRequiresConfirmation.startsWith('missing-column:') && (
            <>{'отсутствующий столбец'}</>
          )}
          {replaceRequiresConfirmation === 'type-mismatch' && (
            <>{'несоответствие типов данных'}</>
          )}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {replaceRequiresConfirmation === 'parse-error' && (
          <>
            <p>{'При анализе новых данных произошла ошибка.'}</p>
            <p>
              {'Вы можете загрузить новые данные и попытаться исправить ошибку'}{' '}
              {'или вернуться к ранее загруженным данным.'}
            </p>
          </>
        )}
        {replaceRequiresConfirmation.startsWith('missing-column:') && (
          <>
            <p>
              {'Для отображения данных этого проекта требуется параметр'}{' '}
              <span className="font-weight-bold">
                {replaceRequiresConfirmation.split(':')[1]}
              </span>
              {', которые мы не можем найти в новых данных.'}
            </p>
            <p>
              {'Вы можете создать новое сопоставление данных с новыми данными'}{' '}
              {'или вернуться к ранее загруженным данным.'}
            </p>
          </>
        )}
        {replaceRequiresConfirmation === 'type-mismatch' && (
          <>
            <p>
              {'Типы данных, ранее установленные для этого проекта,'}{' '}
              {'не могут быть применены к новым данным.'}
            </p>
            <p>
              {'Вы можете использовать новые данные и повторно задать типы данных'}{' '}
              {'или вернуться к ранее загруженным данным.'}
            </p>
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="warning"
          onClick={() => {
            commitDataReplace()
          }}
        >
          {'Загрузить новые данные'}
        </Button>
        <Button
          variant="secondary"
          onClick={() => {
            cancelDataReplace()
          }}
        >
          {'Отмена'}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default DataMismatchModal
