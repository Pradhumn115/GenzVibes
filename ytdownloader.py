import subprocess
import shutil 
import os.path
from typing import Type
from zipfile import ZipFile
from yt_dlp import YoutubeDL
import json
import time
from concurrent.futures import ThreadPoolExecutor, as_completed

format_codes=[571,642,401,400,299,616,614,609,136,298,135,18,133,160,140]
# code_to_format={"571":"4320p60","401":"2160p60av01","642":"2160p60","400":"1440p60","299":"1080p60","616":"Premium","614":"1080p","609":"720p","606":"480p","18":"360p","604":"240p","603":"144p","140":"128kbps"}
code_to_format={"571":"4320p60","642":"2160p60vp09","401":"2160p60","400":"1440p60","299":"1080p60","616":"Premium","614":"1080p","298":"720p60","136":"720pav01","609":"720p","135":"480p","18":"360p","133":"240p","160":"144p","140":"128kbps"}


def checkinputlinkforplaylist(inputlink):
    link=(inputlink.find('playlist?'))
    if (link==-1):
        link=False
    else:
        link=True

    return link

def playlistdownloader(inputlink):

    print("Downloading playlist...")

    command = f"yt-dlp -f 'bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best'  -o './YtDownloader/YoutubeFiles/%(playlist_title)s/%(playlist_index)s - %(title)s.%(ext)s' {inputlink}"
    try:
        p= subprocess.check_output(command, shell=True,text=True)
        print(type(p))


    except subprocess.CalledProcessError as e:
        print(f"Error executing command: {e}")


    if checkinputlinkforplaylist(inputlink): 
        print("Zipping playlist")
        with ZipFile('./YtDownloader/ZipFiles/Zipped file.zip', 'w') as zip_object:
            # Traverse all files in directory
            for folder_name, sub_folders, file_names in os.walk('./YtDownloader/YoutubeFiles'):
                for filename in file_names:
                    # Create filepath of files in directory
                    file_path = os.path.join(folder_name, filename)
                    # Add files to zip file
                    zip_object.write(file_path, os.path.basename(file_path))

        if os.path.exists('./YtDownloader/Zipfiles/Zipped file.zip'):
            print("ZIP file created")
        else:
            print("ZIP file not created")


def videodownloader(inputlink):
    print("Downloading Video....")
    try:
        command = f"yt-dlp -f 'bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best'  -o './YtDownloader/YoutubeSingleFiles/%(title)s.%(ext)s' {inputlink} --print after_move:filepath"
        p= subprocess.check_output(command, shell=True,text=True)
        print(p)
        return f"Video Downloaded"

    except subprocess.CalledProcessError as e:
        print(f"Error executing command: {e}")
        return {"title":"Error Please Enter Correct Link","format_list":""}

def filesize_from_tbr(info_file,info):
    sizes=["bytes","KB","MB","GB","TB"]
    """
    @param tbr:      Total bitrate in kbps (1000 bits/sec)
    @param duration: Duration in seconds
    @returns         Filesize in bytes
    """
    if "tbr" in info and "duration" in info_file:
        if info['tbr'] is None or info_file['duration'] is None:
            return None
        else:
            filesize= int(info_file['duration'] * info['tbr'] * (1000 / 8))
            i=0
            while(filesize>1024):
                filesize /= 1024 
                i=i + 1

            return (str(round(filesize,1))+" "+sizes[i])
    else: 
        return None

    

def filesize_from_filesize(info):
    sizes=["bytes","KB","MB","GB","TB"]
    """
    @param tbr:      Total bitrate in kbps (1000 bits/sec)
    @param duration: Duration in seconds
    @returns         Filesize in bytes
    """
    if 'filesize' in info:
        if info['filesize'] is None:
            return None
        
        else:
            filesize = int(info['filesize'])
            i=0
            while(filesize>1024):
                filesize /= 1024 
                i=i + 1
            return (str(round(filesize,1))+" "+sizes[i])

    else:
        return None

def filesize_from_filesize_approx(info):
    sizes=["bytes","KB","MB","GB","TB"]

    """
    @param tbr:      Total bitrate in kbps (1000 bits/sec)
    @param duration: Duration in seconds
    @returns         Filesize in bytes
    """
    if 'filesize_approx' in info:
        if info['filesize_approx'] is None:
            return None
        
        else:
            filesize_approx = int(info['filesize_approx'])
            i=0
            while(filesize_approx>1024):
                filesize_approx /= 1024 
                i=i+1
            return (str(round(filesize_approx,1))+" "+sizes[i])
    else:
        return None

def get_file_size(info_file):
    filesize_json = {}
    filesize=""
    for info in info_file['formats']:
        tbr_filesize = filesize_from_tbr(info_file,info)
        filesize = filesize_from_filesize(info)
        filesize_approx = filesize_from_filesize_approx(info)
        if filesize is not None:
            filesize=filesize
            filesize_json[info['format_id']] = filesize
        elif filesize_approx is not None:
            filesize=filesize_approx
            filesize_json[info['format_id']] = filesize

        elif tbr_filesize is not None:
            filesize=tbr_filesize
            filesize_json[info['format_id']] = filesize

        else:
            filesize=""
            filesize_json[info['format_id']] = filesize

        
    return filesize_json
 
def playlist_filesize_from_tbr(duration,info):
    sizes=["bytes","KB","MB","GB","TB"]
    """
    @param tbr:      Total bitrate in kbps (1000 bits/sec)
    @param duration: Duration in seconds
    @returns         Filesize in bytes
    """

    if "tbr" in info and duration:
    
        
        if info['tbr'] is None or duration is None:
            return None
        else:
            filesize= int(duration * info['tbr'] * (1000 / 8))
            # i=0
            # while(filesize>1024):
            #     filesize /= 1024 
            #     i=i + 1

            return (round(filesize,1))
    else: 
        return None


def playlist_filesize_from_filesize(info):
    sizes=["bytes","KB","MB","GB","TB"]
    """
    @param tbr:      Total bitrate in kbps (1000 bits/sec)
    @param duration: Duration in seconds
    @returns         Filesize in bytes
    """
    if 'filesize' in info:
        if info['filesize'] is None:
            return None
        
        else:
            filesize = int(info['filesize'])
            # i=0
            # while(filesize>1024):
            #     filesize /= 1024 
            #     i=i + 1
            return (round(filesize,1))

    else:
        return None

def playlist_filesize_from_filesize_approx(info):
    sizes=["bytes","KB","MB","GB","TB"]

    """
    @param tbr:      Total bitrate in kbps (1000 bits/sec)
    @param duration: Duration in seconds
    @returns         Filesize in bytes
    """
    if 'filesize_approx' in info:
        if info['filesize_approx'] is None:
            return None
        
        else:
            filesize_approx = int(info['filesize_approx'])
            # i=0
            # while(filesize_approx>1024):
            #     filesize_approx /= 1024 
            #     i=i+1
            return (round(filesize_approx,1))
    else:
        return None

def get_playlist_file_size(info_file,duration):
    filesize_json = {}
    filesize=""
    for info in info_file:
        tbr_filesize = playlist_filesize_from_tbr(duration,info)
        filesize = playlist_filesize_from_filesize(info)
        filesize_approx = playlist_filesize_from_filesize_approx(info)
        if filesize is not None:
            filesize=filesize
            filesize_json[info['format_id']] = filesize
        elif filesize_approx is not None:
            filesize=filesize_approx
            filesize_json[info['format_id']] = filesize

        elif tbr_filesize is not None:
            filesize=tbr_filesize
            filesize_json[info['format_id']] = filesize

        else:
            filesize=""
            filesize_json[info['format_id']] = filesize

        
    return filesize_json

def get_format(info_file):
    global format_codes
    global code_to_format

    
    try:
        
        
        filesize_to_code={}
        present_format_codes=[]
        for code in format_codes:
            for info in info_file["formats"]:
                # print (info)
                if (str(code)+" - " in info["format"]):
                    present_format_codes.append(code)
        
        format_ls_json = {}
        for code in present_format_codes:
            # print(code)
            format_ls_json[str(code)] = code_to_format[str(code)]
        
        return format_ls_json
    except Exception as e:
        print(f"Error executing command: {e}")
        return {"title":"Error Please Enter Correct Link"}
    
def get_playlist_format(info_file):
    


    playlist_info_file=[]
    for video in info_file['entries']:
        for format in video['formats']:
            playlist_info_file.append(format)
        
    try:
        filesize_to_code={}
        present_format_codes=[]
        for code in format_codes:
            for info in playlist_info_file:
                # print (info)
                if (str(code)+" - " in info["format"]):
                    present_format_codes.append(code)

        format_ls_json = {}
        for code in present_format_codes:
          
            format_ls_json[str(code)] = code_to_format[str(code)]

        return format_ls_json
    
    except Exception as e:
        print(f"Error executing command: {e}")
        return {"title":"Error Please Enter Correct Link"}
    
def get_duration(info_file):
    seconds = int(info_file['duration'])
    seconds = seconds % (24 * 3600)
    hour = seconds // 3600
    seconds %= 3600
    minutes = seconds // 60
    seconds %= 60
     
    duration=info_file['duration']
    return {"time":"%dh:%02dm:%02ds" % (hour, minutes, seconds),"duration":duration}
    

def get_playlist_duration(info_file):
    vd = []
    for videos in info_file['entries']:
        vd.append(videos)

    total_videos_duration=0
    video_durations=[]
    seconds=0
    for video in vd:
        splits=video['duration_string'].split(":")
        if len(splits)==2:
            seconds = int(splits[0])*60+int(splits[1])

        elif len(splits)==3:
            seconds = int(splits[0])*60+int(splits[1])*60+int(splits[1])
        
        video_durations.append(seconds)
    
    for duration in video_durations:
        total_videos_duration+=int(duration)

    seconds = total_videos_duration
    seconds = seconds % (24 * 3600)
    hour = seconds // 3600
    seconds %= 3600
    minutes = seconds // 60
    seconds %= 60
     
    duration=total_videos_duration
    return {"time":"%dh:%02dm:%02ds" % (hour, minutes, seconds),"duration":duration}

def get_video_all_info(url):
    
    try:
        ydl_opts={
            # "username":"oauth2",
            # "password":""
        }

        URL = url
        with YoutubeDL(ydl_opts) as ydl:
            info_file = ydl.extract_info(URL,download=False)
        
        format_dict=get_format(info_file)
        size_dict=get_file_size(info_file)
        curr_size_dict={}
        for code in format_dict:
            curr_size_dict[code]=size_dict[code]

        video_duration = get_duration(info_file)
        video_thumbnail=info_file['thumbnail']
        title = info_file['title']
        print(title)

        allformatjson = {"file_type":"Video/Audio","formats":format_dict,"size":curr_size_dict,"duration":video_duration,"thumbnail":video_thumbnail,"url":url,"title":title,"info_file":info_file}
        # print(allformatjson)
        return allformatjson
    
    except Exception as e:
        return {"title":"Enter Valid Link"}


# def my_hook(d):
#     if d['status'] == 'downloading':
#         print ("downloading "+ str(round(float(d['downloaded_bytes'])/float(d['total_bytes'])*100,1))+"%")
#     if d['status'] == 'finished':
#         filename=d['filename']
#         print(filename)

def download_video(code,url,title):

    try:
        curr_time = time.strftime("%H:%M:%S", time.localtime())

        if(not checkinputlinkforplaylist(url)):
            url = url.split("&list=")[0]
        

        if code != "140":
            ydl_opts={'format':f"{code}+140",'paths':{
                'home':"files/YtDownloader/YoutubeSingleFiles"
            },
            "outtmpl":{
                "default":f"{title} {code_to_format[code]}.mp4"
            },
            "no_playlist":True,
            
            # "username":"oauth2",
            # "password":"",
            # 'progress_hooks': [my_hook]
            
            }
            out_name = f"{title} {code_to_format[code]}.mp4"
        else:
            ydl_opts={'format':"140",'paths':{
                'home':"files/YtDownloader/YoutubeSingleFiles"
            },
            "outtmpl":{
                "default":f"{title} {code_to_format[code]}.m4a"
            },
            "no_playlist":True,
            
            # "username":"oauth2",
            # "password":"",
            # 'progress_hooks': [my_hook]

            }
            out_name = f"{title} {code_to_format[code]}.m4a"


        with YoutubeDL(ydl_opts) as ydl:
            ydl.download(url)
   
        return {"output_path":f"YtDownloader/YoutubeSingleFiles/{out_name}","outname":out_name}    
    
    except shutil.SameFileError as e:
        return {"output_path":f"YtDownloader/YoutubeSingleFiles/{out_name}","outname":out_name}   


def download_playlist_video(code,url,title,playlist_title):
    try:
        
        
        if code != "140":
            ydl_opts={'format':f"{code}+140",'paths':{
                'home':f"files/YtDownloader/YoutubeFiles/{playlist_title}"
            },
            "outtmpl":{
                "default":f"{title}.mp4"
            },
            "no_playlist":True,
            
            # "username":"oauth2",
            # "password":"",

            }
            out_name = f"{title}.mp4"

        else:
            ydl_opts={'format':"m4a",'paths':{
                'home':f"files/YtDownloader/YoutubeFiles/{playlist_title}"
            },
            "outtmpl":{
                "default":f"{title}.m4a"
            },
            "no_playlist":True,
            
            # "username":"oauth2",
            # "password":""

            }
            out_name = f"{title}.m4a"

        with YoutubeDL(ydl_opts) as ydl:
            ydl.download(url)
        
        return {"output_path":f"YtDownloader/YoutubeFiles/{playlist_title}/{out_name}","outname":out_name}        
    
    except shutil.SameFileError as e:
        return {"output_path":f"YtDownloader/YoutubeFiles/{playlist_title}/{out_name}","outname":out_name}   

     
def download_check_video(video,code, format_json, format_to_code, format_list, playlist_title):
    while True:
        try:
            myformat = format_json[code]
            result = download_playlist_video(code, f"https://www.youtube.com/watch?v={video['id']}", video['title'], playlist_title)
            if result["status"] == "success":
                return {'status': 'success', 'video': video['title'], 'output_path': result["output_path"]}
            else:
                # Handle the case where format is not suitable
                raise Exception(result["error"])
        except KeyError:
            # Handle case where the format code is not in the format_json
            return {'status': 'error', 'video': video['title'], 'error': f'Format code {code} not found'}
        except Exception as e:
            try:
                code = format_to_code[format_list[format_list.index(myformat) + 1]]
                continue
            except IndexError:
                # No more formats to try
                return {'status': 'error', 'video': video['title'], 'error': str(e)}

def download_playlist(code,info_file):
    curr_time = time.strftime("%H:%M:%S", time.localtime())
    playlist_title= f"{info_file['title']} {code_to_format[code]}"
    # user_code= code
    format_json=get_playlist_format(info_file)
    format_key_list = list(format_json.keys())
    print(format_key_list)
    # myformat = format_json[code]
    format_list=list(code_to_format.values())
    format_to_code = {v: k for k, v in format_json.items()}
    print("Downloading playlist")
    
   
    # for video in info_file['entries']:
    #     code= user_code
    #     while True:
    #         try:
    #             myformat = format_json[code]
    #             output_path=(download_playlist_video(code,f"https://www.youtube.com/watch?v={video['id']}",video['title'],playlist_title))
            
    #             break
    #         except Exception as e:
    #             code=format_to_code[format_list[format_list.index(myformat)+1]]
            
    #             continue
    
    with ThreadPoolExecutor() as executor:
        futures = []
        for video in info_file['entries']:
            future = executor.submit(download_check_video,video ,code, format_json,format_to_code,format_list,playlist_title)
            futures.append(future)

        # Optionally, handle results or exceptions
        for future in as_completed(futures):
            try:
                result = future.result()
                print(f"Downloaded video to {result}")
            except Exception as e:
                print(f"Video download failed: {e}")
    

       
    print("Playlist Downloaded")
    print("Zipping playlist")
    try:
        with ZipFile(f'files/YtDownloader/ZipFiles/{playlist_title}.zip', 'w') as zip_object:
            # Traverse all files in directory
            for folder_name, sub_folders, file_names in os.walk(f'files/YtDownloader/YoutubeFiles/{playlist_title}'):
                for filename in file_names:
                    # Create filepath of files in directory
                    file_path = os.path.join(folder_name, filename)
                    # Add files to zip file
                    zip_object.write(file_path, os.path.basename(file_path))

        if os.path.exists(f'files/YtDownloader/Zipfiles/{playlist_title}.zip'):
            print("ZIP file created")
            
        else:
            print("ZIP file not created")


        return {"output_path":f"YtDownloader/ZipFiles/{playlist_title}.zip","outname":f"{playlist_title}.zip"} 

    

    except Exception as e:
        print(f"Error {e}")

def get_playlist_size(info_file):

    vd = []
    for videos in info_file['entries']:
        vd.append(videos)

    playlist_info_file={}
    tlist=[]
    for i,video in enumerate(vd):
        for format in video['formats']:
            # print(format)
            tlist.append(format)
        playlist_info_file[f"video{i+1}"]=tlist



    video_durations=[]
    video_filesize={}
    seconds=0
    for video in vd:
        splits=video['duration_string'].split(":")
        if len(splits)==2:
            seconds = int(splits[0])*60+int(splits[1])

        elif len(splits)==3:
            seconds = int(splits[0])*60+int(splits[1])*60+int(splits[1])
        
        video_durations.append(seconds)

            
    for i in range(len(playlist_info_file)):
        # for format in playlist_info_file[f"video{i+1}"]:
        filesize=get_playlist_file_size(playlist_info_file[f"video{i+1}"],video_durations[i])
        # print(filesize)
        video_filesize[f'video{i+1}']=filesize


    video_filesize_list=[]
    for video in video_filesize:
        video_filesize_list.append(video_filesize[video])

    total_size_format_json={}
    finalsize=[]
    for size1,size2 in zip(video_filesize['video1'].values(),video_filesize['video2'].values()):
        finalsize.append(size1+size2)
        # print((finalsize))

    for filesize_list in video_filesize_list[2:]:
        for i,size in enumerate(filesize_list.values()):
        
            finalsize[i]=size+finalsize[i]


    # print(finalsize)
    sizes=["bytes","KB","MB","GB","TB"]

    finalsize_format=[]
    for j,lastsize in enumerate(finalsize):
        if lastsize == '':
            lastsize=0
        else:
            lastsize=int(lastsize)
        i=0
        while(lastsize>1024):
            lastsize /= 1024 
            i=i+1
        finalsize_format.append(f"{round(lastsize,1)} {sizes[i]}")


    finalsize_json = {}
    for key,value in zip(video_filesize["video1"].keys(),finalsize_format):
        finalsize_json[key]=value

    
    
    return finalsize_json
   

def get_playlist_all_info(url):
    try:
        URL = url
        ydl_opts={
        # "username":"oauth2",
        # "password":"",
        }
        with YoutubeDL(ydl_opts) as ydl:
            info_file = ydl.extract_info(URL,download=False)
        
        playlist_title= info_file['title']
        playlist_thumbnail = info_file['thumbnails'][0]['url']
        playlist_duration = get_playlist_duration(info_file)
        playlist_size = get_playlist_size(info_file)
        playlist_formats = get_playlist_format(info_file)

        # print(playlist_title,playlist_thumbnail,playlist_duration,playlist_size,playlist_formats)
        
        allformatjson = {"file_type":"Playlist","formats":playlist_formats,"size":playlist_size,"duration":playlist_duration,"thumbnail":playlist_thumbnail,"url":url,"title":playlist_title,"info_file":info_file}

        return allformatjson
    except Exception as e:
        print(f"Error: {e}")
        return {"playlist_title":"Enter Valid Link"}

def main_info(inputlink):
    
    if(checkinputlinkforplaylist(inputlink)):
        print("playlist")
        response=get_playlist_all_info(inputlink)
        return response

    else:
       print("video")
       inputlink = inputlink.split("&list=")[0]
       response=get_video_all_info(inputlink)
       return response


async def main_download(code,inputlink,title,info_file):
    URL = inputlink
   

    if(checkinputlinkforplaylist(inputlink)):
        print("playlist")
        response=download_playlist(code,info_file)
        return response

    else:
       print("video")
       inputlink = inputlink.split("&list=")[0]
       response=download_video(code,URL,title)
       return response










# # print(get_video_all_info("https://www.youtube.com/watch?v=Rwe5Aw3KPHY"))
print(download_video("140","https://www.youtube.com/watch?v=1w_6PdYgOwk",'Ramayan Chaupai  Played by Harshit Shankar [1w_6PdYgOwk]'))
# # URL = "https://www.youtube.com/playlist?list=PLZoTAELRMXVNAprLfaHq64tBeCGvWSVpv"
# # get_playlist_all_info(url=URL)
# # print(main_info("https://www.youtube.com/watch?v=1w_6PdYgOwk"))
# info_file=(main_info("https://www.youtube.com/watch?v=1w_6PdYgOwk")['info_file'])
# print(main_download("140","https://www.youtube.com/watch?v=1w_6PdYgOwk","Ramayan Chaupai  Played by Harshit Shankar [1w_6PdYgOwk]",info_file))