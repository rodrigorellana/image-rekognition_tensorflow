const tf = require('@tensorflow/tfjs-node-gpu')

const data = require('./data')
const model = require('./model')

async function run(epochs, batchSize, modelSavePath) {
    data.loadData();
    const {images: trainImages, labels: trainLabels} = data.getTrainData();
    console.log('Training Images (Shape)' + trainImages.shape);
    console.log('Training LAbels (Shape)' + trainLabels.shape);

    model.summary()

    const validationSplit = 0.15;
    await model.fit(trainImages, trainLabels, {
        epochs,
        batchSize,
        validationSplit
    })

    const {images: testImages, labels: testLabels} = data.getTestData();
    const evalOutput = model.evaluate(testImages, testLabels)

    console.log('Loss', evalOutput[0].dataSync()[0].toFixed(3))
    console.log('Accuracy', evalOutput[1].dataSync()[0].toFixed(3))
    
    const finalPath = 'file://' + modelSavePath
    await model.save(finalPath)
    console.log('Save model to', finalPath)
}

run (100, 32, './model')