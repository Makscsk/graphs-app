import React, { useState, useEffect } from 'react'
import useWindowSize from '../../hooks/useWindowSize'
import { Modal, Button } from 'react-bootstrap'
import { BsEnvelopeFill } from 'react-icons/bs'

function ScreenSizeAlert() {
  const size = useWindowSize()
  const [showModal, setShowModal] = useState(size.width < 992)
  const [modalWasClosed, setModalWasClosed] = useState(false)

  const handleClose = () => {
    setShowModal(false)
    setModalWasClosed(true)
  }

  useEffect(() => {
    if (modalWasClosed === false) {
      setShowModal(size.width < 992)
    }
  }, [modalWasClosed, size])

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
      <Modal.Header closeButton>
        <Modal.Title as="h5">
          {'Добро пожаловать на сайт Graphs'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="big">
          {'Сайт Graphs разработан для'} {size.width >= 768 ? 'чуть ' : ' '}
          {'большего размера!'}
        </p>
        <p>
          {'Для решения этой проблемы, попробуйте изменить размер вашего окна браузера.'}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>
          {'OK'}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ScreenSizeAlert
