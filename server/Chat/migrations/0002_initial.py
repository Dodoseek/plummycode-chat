# Generated by Django 4.2.4 on 2023-08-07 09:40

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('Chat', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddField(
            model_name='message',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to=settings.AUTH_USER_MODEL, verbose_name='User'),
        ),
        migrations.AddField(
            model_name='imagesofmessage',
            name='message',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Chat.message', verbose_name='Message'),
        ),
        migrations.AddField(
            model_name='chat',
            name='users',
            field=models.ManyToManyField(related_name='users', to=settings.AUTH_USER_MODEL, verbose_name='Users'),
        ),
    ]
