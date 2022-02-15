# Generated by Django 4.0 on 2022-02-11 21:52

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0005_productmodel_delete_locationmodel'),
    ]

    operations = [
        migrations.CreateModel(
            name='OrderModel',
            fields=[
                ('OrderId', models.AutoField(primary_key=True, serialize=False)),
                ('FirstName', models.CharField(max_length=250)),
                ('LastName', models.CharField(max_length=250)),
                ('Email', models.CharField(max_length=250)),
                ('ContactNo', models.CharField(max_length=250)),
                ('Address', models.TextField(max_length=1250)),
                ('Price', models.FloatField()),
                ('Qty', models.FloatField()),
                ('TotalPrice', models.FloatField()),
                ('Status', models.CharField(choices=[('New', 'New'), ('Accepted', 'Accepted'), ('Pending payment', 'Pending payment'), ('Completed', 'Completed'), ('Cancel', 'Cancel')], default='New', max_length=100)),
                ('Date', models.DateTimeField(auto_now_add=True)),
                ('User', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app.usermodel')),
            ],
        ),
    ]
