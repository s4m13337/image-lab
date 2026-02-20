console.log("Hello");
const prompt = document.querySelector('#prompt')
const cfgScale = document.querySelector('#cfgscale')
const cfgScaleValue = document.querySelector('#cfgscalevalue')
const steps = document.querySelector('#steps')
const stepsValue = document.querySelector('#stepsvalue')
const outputContainer = document.querySelector('#output-container')
const generateButton = document.querySelector('#generate-button')

cfgScale.addEventListener('input', () => {
    cfgScaleValue.textContent = cfgScale.value
})

steps.addEventListener('input', () => {
    stepsValue.textContent = steps.value
})


async function generateImage() {

    generateButton.disabled = true

    outputContainer.innerHTML = `<progress></progress>`

    //const url = 'http://127.0.0.1:1234/sdapi/v1/txt2img'
    const payload = {
        'prompt': prompt.value,
        'steps': parseInt(steps.value, 10),
        'cfg_scale': parseFloat(cfgScale.value)
    }
    try {
        const response = await fetch(url, 
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        const data = await response.json()
        const image = data['images'][0]
        outputContainer.innerHTML = `<img src="data:img/png;base64,${image}" />`
        generateButton.disabled = false
    } catch (error) {
        outputContainer.innerHTML = "Error generating image"
        console.log(error)
    }
    
}
