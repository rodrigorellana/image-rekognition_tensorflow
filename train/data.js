const tf = require('@tensorflow/tfjs-node-gpu')
const fs = require('fs')
const path = require('path')

const TRAIN_IMAGES_DIR = './data/train'
const TEST_IMAGES_DIR = './data/test'

function loadImages(dataDir) {
    const images = []
    const labels = []

    var files = fs.readdirSync(dataDir);
    for (let i = 0; i < files.length; i++) {
        const filePath = path.join(dataDir,files[i])
        var buffer = fs.readFileSync(filePath)
        var imageTensor = tf.node.decodeImage(buffer)
            .resizeNearestNeighbor([96, 96])
            .toFloat()
            .div(tf.scalar(255.0))
            .expandDims();

        images.push(imageTensor);

        var hasTuberculosis = files[i].toLocaleLowerCase().endsWith('_1.png');
        labels.push(hasTuberculosis);
    }

    return [images, labels]
}

class TuberculosisDataSet {
    constructor() {
        this.trainData = []
        this.testData = []
    }

    loadData() {
        console.log('Loading images...')
        this.trainData = loadImages(TRAIN_IMAGES_DIR);
        this.trainData = loadImages(TEST_IMAGES_DIR);
    }

    getTrainData() {
        return {
            images: tf.concat(this.trainData[0]),
            labels: tf.oneHot(tf.tensor1d(this.trainData[1], 'int32'), 2).toFloat()
        }
    }

    getTestData() {
        return {
            images: tf.concat(this.testData[0]),
            labels: tf.oneHot(tf.tensor1d(this.testData[1], 'int32'), 2).toFloat()
        }
    }
}

module.exports = new TuberculosisDataSet()
