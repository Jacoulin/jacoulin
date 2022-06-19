import json
import math
import re

import requests
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse


# 测试
# def index(request):
#     return HttpResponse('Hello, World')

def home(request):
    return render(request, 'home.html')


def index(request):
    return render(request, 'index.html')


def song(request):
    url = "https://music.163.com/discover/toplist?id=3778678"

    headers = {
        "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.61 Safari/537.36"
    }

    response = requests.get(url=url, headers=headers)

    # print(response.text)

    # 3.解析数据
    # <li><a href="/song\?id=(.*?)">(.*?)</a></li>

    # song_list = re.findall('<li><a href="/song\?id=(.*?)">(.*?)</a></li>', response.text)

    # song_resp_list = []
    # for song in song_list:
    #     # 4.保存数据
    #     music_url = f'http://music.163.com/song/media/outer/url?id={song[0]}'
    #     print(music_url)
    #
    #     song_dict = {
    #         'name': song[1],
    #         'url': music_url,
    #         'id': song[0],
    #         'title': song[1],
    #         'duration': 0,
    #         'singer': 'null'
    #     }
    #
    #     song_resp_list.append(song_dict)

    song_list = re.findall('<textarea id="song-list-pre-data" style="display:none;">(.*?)</textarea>', response.text)

    song_list = json.loads(song_list[0])
    print(type(song_list))
    count = 0
    song_resp_list = []
    for song in song_list:
        count += 1
        id = song.get("id")
        name = song.get("name")
        url = f'http://music.163.com/song/media/outer/url?id={id}'
        duration = song.get("duration")
        # duration = "%02d%02d" % divmod(int(song.get("duration")), 60)
        print(duration)
        artists = song.get("artists")[0].get("name")

        song_dict = {
            'name': name,
            'url': url,
            'id': id,
            'title': name,
            'duration': duration,
            'singer': artists
        }

        song_resp_list.append(song_dict)

    print(count)

    song_resp = {
        'data': song_resp_list
    }

    print(song_resp)

    return JsonResponse(song_resp, status=200, json_dumps_params={"ensure_ascii":False})


# 页面不存在
def page_not_found(request):
    return render(request, '404.html')


# 拒绝服务
def permission_denied(request):
    return render(request, '403.html')


# 请求错误
def bad_request(request):
    return render(request, '400.html')


# 服务器错误
def page_error(request):
    return render(request, '500.html')