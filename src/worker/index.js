import * as Comlink from 'comlink'
/* eslint-disable import/no-webpack-loader-syntax */
import Worker from 'worker-loader!./worker'

let parsingWorker

export function parseDatasetInWorker(data, dataTypes, parsingOptions) {
  if (!parsingWorker) {
    parsingWorker = new Worker()
  }
  let obj = Comlink.wrap(parsingWorker)
  let out = obj.parseDataset(data, dataTypes, parsingOptions)
  return out
}

let mappingWorker

export function mapDataInWorker(
  chartName,
  { data, mapping, visualOptions, dataTypes },
  customChart
) {
  if (!mappingWorker) {
    mappingWorker = new Worker()
  }
  let obj = Comlink.wrap(mappingWorker)
  let out = obj.mapData(
    chartName,
    { data, mapping, visualOptions, dataTypes },
    customChart
  )
  return out
}
