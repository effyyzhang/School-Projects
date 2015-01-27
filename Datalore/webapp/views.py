import os, sys

#import other views here

from webapp import app, db, lm

from flask import Flask, request, session, g, redirect, url_for, abort, render_template, flash, send_from_directory, jsonify, Response, json
from flask.ext.login import login_user, logout_user, current_user, login_required

from flask_wtf import Form
from wtforms import TextField, TextAreaField, PasswordField, BooleanField
from wtforms.validators import DataRequired

@app.route('/')
@app.route('/main')
def mainpage():
    return render_template("main.html")

