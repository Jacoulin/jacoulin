from django.shortcuts import render
from django.http import HttpResponse


# 测试
def index(request):
    return HttpResponse('Hello, World')


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