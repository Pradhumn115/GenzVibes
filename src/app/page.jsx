"use client"

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { montera, aneklatin, manjari} from './fonts.jsx'

import { FaAnglesUp } from "react-icons/fa6";
import { RiSearch2Line } from "react-icons/ri";

import { FaLink } from "react-icons/fa6";
import { FaLongArrowAltRight } from "react-icons/fa";

import { BiCameraMovie } from "react-icons/bi";
import { FaDownload } from "react-icons/fa6";

import { FaRegFileZipper } from "react-icons/fa6";

import { TbWorldQuestion } from "react-icons/tb";
import Script from 'next/script.js';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { ReloadIcon } from "@radix-ui/react-icons"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import AdBanner from './Components/adbar.jsx';
import AdBanner2 from './Components/adbar2.jsx';
import Navbar from './Components/Navbar.jsx';
import Footer from './Components/Footer.jsx';
import { montserrat } from './fonts.jsx';

const Home = () => {

  const [query, setQuery] = useState("")
  const [answer, setAnswer] = useState(false)
  const [isAnswer, setIsAnswer] = useState(false)
  const [youtubeVideoFormat, setYoutubeVideoFormat] = useState({ '616': 'Premium', '614': '1080p', '609': '720p', '136': '720pav01', '135': '480p', '18': '360p', '133': '240p', '160': '144p', '140': '128kbps' })
  const [position, setPosition] = useState("Format")
  const [generating, setGenerating] = useState(false)
  const [youtubeVideoTitle, setYoutubeVideoTitle] = useState(false)
  const [showYoutubeTool, setShowYoutubeTool] = useState(false)
  const [processtime, setProcesstime] = useState(0)
  const [youtubeVideoDuration, setYoutubeVideoDuration] = useState("")
  const [youtubeVideoFileType, setYoutubeVideoFileType] = useState("")
  const [youtubeVideoSize, setYoutubeVideoSize] = useState({ 'sb3': '0 bytes', 'sb2': '0 bytes', 'sb1': '0 bytes', 'sb0': '0 bytes', '233': '0 bytes', '234': '0 bytes', '139-drc': '28.2 MB', '249-drc': '19.9 MB', '250-drc': '26.7 MB', '139': '28.2 MB', '249': '29.1 MB', '250': '38.9 MB', '140-drc': '74.8 MB', '251-drc': '48.4 MB', '140': '74.8 MB', '251': '70.6 MB', '602': '41.6 MB', '269': '47.7 MB', '160': '7.3 MB', '603': '72.6 MB', '278': '12.9 MB', '229': '86.7 MB', '133': '12.6 MB', '604': '114.6 MB', '242': '21.5 MB', '230': '178.8 MB', '134': '20.9 MB', '18': '108.0 MB', '605': '293.5 MB', '243': '45.7 MB', '231': '249.8 MB', '135': '31.6 MB', '606': '331.1 MB', '244': '65.8 MB', '232': '349.2 MB', '136': '46.1 MB', '609': '601.1 MB', '247': '111.9 MB', '270': '906.0 MB', '137': '129.0 MB', '614': '812.7 MB', '248': '169.4 MB', '394': '10.6 MB', '395': '16.9 MB', '396': '31.0 MB', '397': '45.1 MB', '398': '78.3 MB', '399': '117.7 MB', '616': '1.9 GB' })
  const [youtubeVideoThumbnail, setYoutubeVideoThumbnail] = useState(null)
  const [youtubeDownloadPath, setYoutubeDownloadPath] = useState("")
  const [youtubeVideoUrl, setYoutubeVideoUrl] = useState("")
  const [error, setError] = useState("")
  // const [defaultCode, setDefaultCode] = useState(609)
  const [youtubeOutName, setYoutubeOutName] = useState("")
  const [downloadStatus, setDownloadStatus] = useState("");
  const [infoFile, setInfoFile] = useState("")

  // useEffect(() => {
  //   if (youtubeDownloadPath) {
  //     console.log("Download Path is ready:", youtubeDownloadPath);
  //   }
  // }, [youtubeDownloadPath]);



  useEffect(() => {
    isAnswer && setTimeout(() => {
      let time1 = (processtime + 0.1)
      setProcesstime(parseFloat(time1.toFixed(1)))
    }, 100);

  }, [isAnswer, processtime])

  useEffect(() => {
    setGenerating(false)
    setDownloadStatus(false)

  }, [position])

  const downloadStatusfunc = () => {
    if (!youtubeDownloadPath) {
      console.log("youtube Path Not Defined")
    }
    console.log(youtubeDownloadPath)
    setDownloadStatus(true)
    setTimeout(() => {
      setDownloadStatus(false)
    }, 5000);
  }



  // const callAi = async () => {

  //   setShowYoutubeTool(false)
  //   setAnswer(false)
  //   setProcesstime(0)
  //   setPosition("Format")
  //   setGenerating(false)
  //   setIsAnswer(true)
  //   const res = await fetch('/api/python/fetchData', {
  //     method: 'POST',
  //     headers: {
  //       'Access-Control-Allow-Origin': '*',
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ "text": query }),
  //   })

  //   const data = await res.json()
  //   console.log(data)

  //   if (data['title']) {
  //     setShowYoutubeTool(true)
  //     setYoutubeVideoTitle(data['title'])
  //     setYoutubeVideoFileType(data['file_type'])
  //     setYoutubeVideoDuration(data['duration']['time'])
  //     setYoutubeVideoFormat(data['formats'])
  //     setYoutubeVideoSize(data['size'])
  //     setYoutubeVideoThumbnail(data['thumbnail'])
  //     setYoutubeVideoUrl(data['url'])
  //     setInfoFile(data['info_file'])
  //   }
  //   else if (data['movie_list']) {
  //     setAnswer(data['movie_list'])
  //   }

  //   setIsAnswer(false)



  // }

  const [taskId, setTaskId] = useState(null);

  const checkTaskStatus = async (taskId) => {
    try {
      const res = await fetch(`/api/python/checkStatus?taskid=${taskId}`);
      if (res.ok) {
        let data = await res.json();
        console.log(data,data.status,"hi")
        if (data.status === 'Pending') {
          // Continue polling
          setTimeout(() => {
            console.log(data)
            checkTaskStatus(taskId)
          }, 1000);  // Poll every 5 seconds
        } else if (data.status === 'Completed') {
          // Task is done
            data = data.result
            if ('title' in data) {
                  setShowYoutubeTool(true)
                  setYoutubeVideoTitle(data['title'])
                  setYoutubeVideoFileType(data['file_type'])
                  setYoutubeVideoDuration(data['duration']['time'])
                  setYoutubeVideoFormat(data['formats'])
                  setYoutubeVideoSize(data['size'])
                  setYoutubeVideoThumbnail(data['thumbnail'])
                  setYoutubeVideoUrl(data['url'])
                  setInfoFile(data['info_file'])
            }
            else if ('movie_list' in data) {
              setAnswer(data['movie_list'])
            }
            else if ('output_path' in data){
              if(data['error']){
                setError(data['error'])
                setDownloadStatus(true)
                setGenerating("downloadReady")
              }
              else{
              setYoutubeDownloadPath(data['output_path'])
              setYoutubeOutName(data['outname'])
              setGenerating("downloadReady")
              }

            }
            
            setIsAnswer(false)
        } else {
          // Handle failure
          console.log(data.status)
          setError(data.status);
          setGenerating("failed");
        }
      } else {
        throw new Error('Failed to check task status');
      }
    } catch (error) {
      console.error('Error:', error);
      setError(error.message);
    }
  }


  const callAi = async () => {
    setShowYoutubeTool(false);
    setAnswer(false);
    setProcesstime(0);
    setPosition("Format");
    setGenerating(false);
    setIsAnswer(true);

    try {
      const res = await fetch('/api/python/fetchData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "text": query }),
      });

      if (res.ok) {
        const data = await res.json();
        setTaskId(data.task_id);  // Save the task ID
        checkTaskStatus(data.task_id);  // Start polling for task status
      } else {
        throw new Error('Failed to submit task');
      }
    } catch (error) {
      console.error('Error:', error);
      setError(error.message);
      setIsAnswer(false);
    }
  }




  // const generateYoutubeDownloadLink = async () => {
  //   setGenerating(true)
  //   const res = await fetch('/api/python/fetchData', {
  //     method: 'POST',
  //     headers: {
  //       'Access-Control-Allow-Origin': '*',
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ "code": position, "url": youtubeVideoUrl, "title": youtubeVideoTitle,"info_file":infoFile }),
  //   })
  //   const data = await res.json()
  //   console.log(data)
  //   if(data['error']){
  //     setError(data['error'])
  //     setDownloadStatus(true)
  //     setGenerating("downloadReady")
  //   }
  //   else{
  //   setYoutubeDownloadPath(data['output_path'])
  //   setYoutubeOutName(data['outname'])
  //   setGenerating("downloadReady")
  //   }

  // }

  const generateYoutubeDownloadLink = async () => {
    console.log('generating')
    setGenerating(true);

    try {
      const res = await fetch('/api/python/fetchData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "code": position, "url": youtubeVideoUrl, "title": youtubeVideoTitle, "info_file": infoFile }),
      });

    //   const data = await res.json();
    //   console.log(data);
    //   if (data.error) {
    //     setError(data.error);
    //     setGenerating("downloadReady");
    //   } else {
    //     setYoutubeDownloadPath(data.output_path);
    //     setYoutubeOutName(data.outname);
    //     setGenerating("downloadReady");
    //   }
    // } catch (error) {
    //   console.error('Error:', error);
    //   setError(error.message);
    //   setGenerating("failed");
    // }
      console.log(res)

      if (res.ok) {
        const data = await res.json();
        console.log(data)
        setTaskId(data.task_id);  // Save the task ID
        checkTaskStatus(data.task_id);  // Start polling for task status
      } else {
        throw new Error('Failed to submit task');
      }
  } catch (error) {
    console.error('Error:', error);
      setError(error.message);
      setGenerating("downloadReady")
      setDownloadStatus(true);
  }
  }




  return (
    <main className='relative w-screen min-h-screen text-white overflow-hidden'>
      <div className='absolute top-0 w-screen h-screen backdrop-blur-[90px] bg-black/[76%] '></div>
      <Image
        src={`/Images/triangles.png`}
        fill
        priority={true}
        className=''
        alt='bg-Image'
      />

      <Image
        src={`/Images/bg.png`}
        fill
        priority={true}
        alt='bg-Image'
        className='-z-10'
      />


      <Navbar />


      <div className='w-screen h-[93vh] relative flex justify-center'>

        <div className={`h-screen w-screen flex flex-col items-center justify-center`}>

          <div className={`${montera.className} text-[7vw]`}>Coming Soon</div>
          <div className={`${montserrat.className} text-[3vw]`}>-- Let the AI Age Begin --</div>

        </div>


        {/* <div className='block1 sm:w-2/6 px-4 py-4 sm:flex hidden'>
          <Script strategy='lazyOnload' async="async" data-cfasync="false" src="//pl24340465.cpmrevenuegate.com/c839f249dfdcac3432df38fd19ce80b4/invoke.js"></Script>
          <div id="container-c839f249dfdcac3432df38fd19ce80b4"></div>

        </div>

        <div className='block2 w-5/6 sm:w-4/6  flex flex-col items-center px-[1.5vw] pt-[5vw] sm:pt-[3vw] pb-[0vw] gap-[8vw] sm:gap-[3vw]'>
          <button type="button" className={`absolute top-[0px] items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-slate-800 hover:bg-slate-700 transition ease-in-out duration-150 cursor-wait ${isAnswer == true ? 'inline-flex' : 'hidden'} min-w-[11.5vw]`} disabled="">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing... {processtime}
          </button> */}
          {/* <h1 className={`${aneklatin.className} font-black text-[7vw] lg:text-[3vw] md:text-[4vw] text-center leading-tight `}>
            Get Every Download Link <br />Without Going Any Further
          </h1> */}

          {/* <div>

            <div className={` w-[75vw] h-[10vw] md:w-[45vw] md:h-[5vw] md: lg:w-[33vw] lg:h-[3vw] rounded-full rounded-ss-lg bg-[#5A5A5A] flex items-center px-2 py-2  justify-between ${manjari.className} relative`}>
              <RiSearch2Line className='text-[5vw] lg:pl-1 lg:-mt-1 lg:text-[1.8vw] md:text-[2.7vw]' />
              <input type="text" name="query" id="query"
                className='w-[74%] md:w-[lg%] lg:w-[80%] bg-transparent outline-none text-[3.5vw] md:text-[2vw] truncate lg:text-[1.1vw]'
                placeholder='Search Movie Titles,Youtube Playlists...'
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => { e.key == "Enter" ? callAi() : "" }}
              />
              <button disabled={isAnswer} onClick={callAi} className='disabled:bg-slate-400 bg-white hover:bg-slate-300 px-[2.5vw] lg:px-[1vw] rounded-full py-[1.6vw] md:py-[1.2vw] md:px-[1.8vw] lg:py-[0.7vw]'><FaAnglesUp className='text-black text-[3vw] md:text-[1.4vw] lg:text-[1vw]' /></button>

            </div>
            <h1 className={`${aneklatin.className} text-[2vw] md:text-[1.2vw] lg:text-[0.7vw] text-center`}>*Currently Only Supports Movies, Youtube Video And Playlist Download Links</h1>

          </div>

          <div className={`undersearchbar flex justify-left -mt-[5vw] sm:-mt-[2vw] md:-mt-[2vw] lg:w-[30vw] lg:h-[3vw] ${manjari.classname} font-semibold text-[3vw] md:text-[2vw] lg:text-[1vw]`}>
            <p>What to Search <TbWorldQuestion className='inline-block' /> <br /> 1. Movies <FaLongArrowAltRight className='inline-block' /> Name of Movie <BiCameraMovie className='inline-block' /> <br /> 2. Yt Video, Playlist <FaLongArrowAltRight className='inline-block' /> Enter Link <FaLink className='inline-block'/> of it <br /> Note : Extract Zip <FaRegFileZipper className='inline-block' /> using Winrar</p>
          </div> */}
        


          {/* <div className={`block2text ${manjari.className}`}>

            <div className={`youtubetool flex-col items-center gap-[3vw] text-center ${showYoutubeTool ? "flex" : "hidden"}`}>
              <div className='flex-col sm:flex-row flex  gap-[6vw] w-[65vw] sm:w-auto sm:gap-[1vw] items-center'>
                <div className='bg-transparent w-[60vw] md:w-[44vw] lg:w-[10vw] rounded-md'><img src={youtubeVideoThumbnail} className=' object-cover rounded-md' alt="Thumbnail" /></div>
                <div className='flex flex-col text-left'>
                  <h2>Title : &nbsp; {youtubeVideoTitle} </h2>
                  <h2>File Type : &nbsp; {youtubeVideoFileType} </h2>
                  <h2>Duration : &nbsp; {youtubeVideoDuration} </h2>
                </div>


              </div>
              <div className='flex items-center gap-[1vw]'>
                <DropdownMenu>
                  <DropdownMenuTrigger className='px-[2vw] py-2 outline-none bg-slate-700 rounded-lg '>{position != "Format" ? youtubeVideoFormat[position] : position}</DropdownMenuTrigger>
                  <DropdownMenuContent className='bg-[#242527] text-white border-0 h-[20vw] lg:h-[12vw]'>
                    <ScrollArea className='h-[19vw] lg:h-[11.5vw]'>
                      <DropdownMenuLabel className={manjari.className}>Video</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuRadioGroup value={position} onValueChange={setPosition} className={manjari.className}>
                        {Object.keys(youtubeVideoFormat).map((key) => {
                          if (key != "140") {

                            return (
                              <DropdownMenuRadioItem key={key} value={key}>{`${youtubeVideoFormat[key]} | ${youtubeVideoSize[key]}`}</DropdownMenuRadioItem>
                            )
                          }

                        })}
                      </DropdownMenuRadioGroup>
                      <DropdownMenuSeparator />
                      <DropdownMenuLabel className={manjari.className}>Audio</DropdownMenuLabel>
                      <DropdownMenuRadioGroup value={position} onValueChange={setPosition} className={manjari.className}>
                        {Object.keys(youtubeVideoFormat).map((key) => {
                          if (key == "140") {

                            return (
                              <DropdownMenuRadioItem key={key} value={key}>{`${youtubeVideoFormat[key]} | ${youtubeVideoSize[key]}`}</DropdownMenuRadioItem>
                            )
                          }

                        })}
                      </DropdownMenuRadioGroup>
                    </ScrollArea>
                  </DropdownMenuContent>
                </DropdownMenu>

                {!generating ?
                  <Button onClick={generateYoutubeDownloadLink} disabled={position == "Format"} variant="ghost" className=' bg-red-600'>Generate</Button>
                  : generating == "downloadReady" && youtubeDownloadPath ?
                    <>


                      <Button variant="outline" size="icon" onClick={downloadStatusfunc} disabled={downloadStatus}>
                        <a href={`/api/next/download/?urlPath=${encodeURIComponent(youtubeDownloadPath)}`} download ><FaDownload className='text-black w-4 h-4' /></a>
                      </Button>

                      {error && <p style={{ color: 'red' }}>{error}</p>}

                    </>

                    :
                    <div className='flex flex-col '>
                      <Button disabled className='bg-[#293648] text-white h-10'>
                        <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                        Please wait
                      </Button>
                    </div>


                }
              </div>
              {generating == "downloadReady" && youtubeDownloadPath ? ""
                :
                <p className=''>*Playlist Download Takes Time Please be Patient</p>
              }


            </div>

            {answer && <div className={`tableOfMovies max-h-80`}>
              <ScrollArea className="rounded-md border border-slate-300 p-4 w-[75vw] h-[95vw] md:w-[45vw] md:h-[50vw] lg:min-w-[32vw] lg:h-[20vw]">
                <Table>
                  <TableCaption>The List Of Movies.</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">Movie Name</TableHead>
                      <TableHead className="text-center">Quality</TableHead>
                      <TableHead className="text-center">VCloud</TableHead>
                      <TableHead className="text-center">Gdrive</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {answer.map((element, i) => {
                      console.log(element, i)
                      return (
                        <TableRow key={i} className={`hover:bg-none`}>
                          <TableCell className="font-medium w-[10vw] overflow-x-auto break-all">{element['movie_title']}</TableCell>
                          <TableCell className='text-center' >{element['resolution']}</TableCell>
                          <TableCell className='text-center'><a href={element['vcloud']} target='_blank'><Button className={`bg-blue-500`}>Link</Button></a></TableCell>
                          <TableCell className='text-center cursor-pointer' ><a href={element['gdrive']} target='_blank'><Button className={`bg-blue-500`}>Link</Button></a></TableCell>

                        </TableRow>
                      )




                    })}
                  </TableBody>
                </Table>

              </ScrollArea>
            </div>}




          </div>


        </div>

        <div className='block3 sm:w-2/6 px-4 py-4 justify-end sm:flex hidden'>
          <AdBanner2 />
        </div> */}




      </div>

      <Footer />

    </main>
  )
}

export default Home