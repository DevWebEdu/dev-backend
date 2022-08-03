# Generated by Django 4.0.6 on 2022-07-23 15:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Categorias',
            fields=[
                ('categoriaId', models.AutoField(primary_key=True, serialize=False)),
                ('categoriaNombre', models.CharField(max_length=200)),
                ('categoriaDescripcion', models.CharField(max_length=200)),
                ('estado', models.BooleanField(default=True, null=True)),
            ],
            options={
                'db_table': 'categorias',
            },
        ),
    ]
