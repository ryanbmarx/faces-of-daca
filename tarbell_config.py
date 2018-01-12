# -*- coding: utf-8 -*-

"""
Tarbell project configuration
"""
from flask import Blueprint, g, render_template
import ftfy
import jinja2
# import xlrd
# from markupsafe import Markup
# import json
# import datetime

# For the image sizing
from PIL import Image

blueprint = Blueprint('faces-of-daca', __name__)

# @blueprint.app_template_global('get_labels')
# @blueprint.app_template_filter()
# @jinja2.contextfilter
@blueprint.app_template_filter('is_vertical_photo')
def is_vertical_photo(id):
	"""
	We need to know if the photo is vertical for style reasons. 
	Return true if it is.
	"""
	try:
		im = Image.open("img/people/" + id + ".jpg")
		width,height = im.size
		if width > height:
			return False
		return True
	except IOError:
		print("Can't find ", id)


# Google spreadsheet key
SPREADSHEET_KEY = "1t8-JGai_adp4dzj8wO4KvvDrFYd8ThRHdwQOsFXZScE"

# Exclude these files from publication
EXCLUDES = ['*.md', 'subtemplates', 'img/src' ,'requirements.txt', 'node_modules', 'sass', 'js/src', 'package.json', 'package-lock.json', 'Gruntfile.js']

# Spreadsheet cache lifetime in seconds. (Default: 4)
# SPREADSHEET_CACHE_TTL = 4

# Create JSON data at ./data.json, disabled by default
# CREATE_JSON = True

# Get context from a local file or URL. This file can be a CSV or Excel
# spreadsheet file. Relative, absolute, and remote (http/https) paths can be 
# used.
# CONTEXT_SOURCE_FILE = ""

# EXPERIMENTAL: Path to a credentials file to authenticate with Google Drive.
# This is useful for for automated deployment. This option may be replaced by
# command line flag or environment variable. Take care not to commit or publish
# your credentials file.
# CREDENTIALS_PATH = ""

# S3 bucket configuration
S3_BUCKETS = {
    # Provide target -> s3 url pairs, such as:
    #     "mytarget": "mys3url.bucket.url/some/path"
    # then use tarbell publish mytarget to publish to it
    
    "production": "graphics.chicagotribune.com/faces-of-daca",
    "staging": "apps.beta.tribapps.com/faces-of-daca",
}

# Default template variables
DEFAULT_CONTEXT = {
    'name': 'faces-of-daca',
    'title': 'Faces of DACA'
}