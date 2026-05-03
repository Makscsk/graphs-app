import { Modal, Button } from 'react-bootstrap'

export default function CustomChartWarnModal({
  toConfirmCustomChart,
  abortCustomChartLoad,
  confirmCustomChartLoad,
}) {
  return (
    <Modal
      show={toConfirmCustomChart !== null}
      onHide={() => abortCustomChartLoad(null)}
      backdrop="static"
      centered
      aria-labelledby="contained-modal-title-vcenter"
      className="raw-modal"
      contentClassName='border'
    >
      <Modal.Header closeButton>
        <Modal.Title>{'Предупреждение!'}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>
          {'Вы собираетесь выполнить сторонний JavaScript, продолжайте на свой страх и риск.'}
        </p>
        {toConfirmCustomChart && toConfirmCustomChart.type === 'project' && (
          <div
            title={toConfirmCustomChart.value.rawCustomChart.source}
            style={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              width: '100%',
            }}
          >
            {toConfirmCustomChart.value.rawCustomChart.source}
          </div>
        )}
      </Modal.Body>

      <Modal.Footer className="d-flex justify-content-between">
        <Button
          variant="light"
          onClick={() => {
            abortCustomChartLoad()
          }}
        >
        {'Не выполнять'}
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            confirmCustomChartLoad()
          }}
        >
        {'Продолжить'}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
