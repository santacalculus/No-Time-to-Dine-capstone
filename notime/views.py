from django.shortcuts import render, redirect, reverse, get_object_or_404

# Create your views here.
from django.urls import reverse

from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponse, Http404, JsonResponse

from django.utils import timezone

from notime.forms import LoginForm, RegisterForm
import json
from django.views.decorators.csrf import ensure_csrf_cookie
from notime.models import WaitTime, Line


# Create your views here.
def login_action(request):
    context = {}

    # Just display the registration form if this is a GET request.
    if request.method == 'GET':
        context['form'] = LoginForm()
        return render(request, 'notime/login.html', context)

    # Creates a bound form from the request POST parameters and makes the 
    # form available in the request context dictionary.
    form = LoginForm(request.POST)
    context['form'] = form

    # Validates the form.
    if not form.is_valid():
        return render(request, 'notime/login.html', context)

    new_user = authenticate(username=form.cleaned_data['username'],
                            password=form.cleaned_data['password'])

    login(request, new_user)
    return redirect('menu')

def logout_action(request):
    logout(request)
    return redirect(reverse('login'))

def register_action(request):
    context = {}

    # Just display the registration form if this is a GET request.
    if request.method == 'GET':
        context['form'] = RegisterForm()
        return render(request, 'notime/register.html', context)

    # Creates a bound form from the request POST parameters and makes the 
    # form available in the request context dictionary.
    form = RegisterForm(request.POST)
    context['form'] = form

    # Validates the form.
    if not form.is_valid():
        return render(request, 'notime/register.html', context)

    # At this point, the form data is valid.  Register and login the user.
    new_user = User.objects.create_user(username=form.cleaned_data['username'], 
                                        password=form.cleaned_data['password'],
                                        email=form.cleaned_data['email'],
                                        first_name=form.cleaned_data['first_name'],
                                        last_name=form.cleaned_data['last_name'])
    new_user.save()

    new_user = authenticate(username=form.cleaned_data['username'],
                            password=form.cleaned_data['password'])

    login(request, new_user)
    return redirect(reverse('menu'))

@login_required
def menu_action(request) :
    context = {}
    if request.method == 'GET' :
        return render(request, 'notime/menu.html', context)

@login_required
def laprima_action(request) :
    context = {}
    #context['wait_time'] = WaitTime.objects.all().order_by('-date_time')
    line = Line.objects.order_by('-id').first()
    
    if line: 
        
        #data = {"num_people": line.num_people}
        line_data = Line.objects.latest('id').num_people
        
        #num = json.loads(num_people.content.decode('utf-8'))
        #context = {'num_people': num['num_people']}
        context['num_people'] = 3
        print(context)
        return render(request, 'notime/laprima.html', context)

    if not 'wait_time' in request.GET or not request.GET['wait_time'] or not 'num_people' in request.GET or not request.GET['num_people']:
        return _my_json_error_response("You must enter a comment to add.", status=400)
    if request.method == 'GET' :
        return render(request, 'notime/laprima.html', context)
    if request.method == 'POST' :
        return render(request, 'notime/laprima.html', context)



def _my_json_error_response(message, status=200):
    # You can create your JSON by constructing the string representation yourself (or just use json.dumps)
    response_json = '{ "error": "' + message + '" }'
    return HttpResponse(response_json, content_type='application/json', status=status)

    