"""
URL configuration for User application.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
# pylint: disable=C0103

from django.urls import path

from .api import (AcceptRequestView, CreateRequestView, FriendListView,
                  GetReceiverRequestView, GetSenderRequestView,
                  RemoveFromFriendListView, UpdateRequestView)

app_name = "friendlist"

urlpatterns = [
    path('<int:user>', FriendListView.as_view(), name='friendlist'),
    path('remove/<int:user>', RemoveFromFriendListView.as_view(), name='delete_friendlist'),

    path('request/receiver/', GetReceiverRequestView.as_view(), name='request_receiver_get'),
    path('request/sender/', GetSenderRequestView.as_view(), name='request_sender_get'),
    path('request/send/', CreateRequestView.as_view(), name="send_request"),
    path('request/update/<int:receiver>', UpdateRequestView.as_view(), name="update_request"),
    path('request/accept/<int:sender>', AcceptRequestView.as_view(), name="accept_request"),
]
