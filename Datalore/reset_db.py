import os
import sys
from webapp import db,app
from models.datamodels import *

def create_db_entries():

    print "Creating new DB"
    
    # recreate database structure
    db.drop_all()
    db.create_all()
    
if __name__ == '__main__':
    create_db_entries()
