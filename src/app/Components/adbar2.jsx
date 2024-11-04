import { useEffect, useRef } from 'react'
export default function AdBanner2(){
    const banner = useRef()

    const atOptions = {
        key: 'aad40d8c858cd5737e309d2502046f0e',
        format: 'iframe',
        height: 600,
        width: 160,
        params: {},
    }
    useEffect(() => {
    if (banner.current && !banner.current.firstChild) {
        const conf = document.createElement('script')
        const script = document.createElement('script')
        script.type = 'text/javascript'
        // script.src = `//www.highperformancedformats.com/${atOptions.key}/invoke.js`
        script.src = `//www.topcreativeformat.com/${atOptions.key}/invoke.js`
        // script.src = `//pl24338845.cpmrevenuegate.com/f1/83/0c/f1830ccd02e4b6a21648d30ff46abb0a.js`
        conf.innerHTML = `atOptions = ${JSON.stringify(atOptions)}`

        banner.current.append(conf)
        banner.current.append(script)
    }
}, [banner])

    return <div className="mx-2 my-5 border border-gray-200 justify-center items-center text-white text-center" ref={banner}></div>
}


