from webapp import db
from models.datamodels import *
import json
from pprint import pprint
from collections import defaultdict

def add_article(json,departs):

    try:
        title = json['dc-title']
        date = json['dc-date-available']
        
        authors = json['dc-contributor-author']
        
        departments = json['dc-contributor-department']

        pub = json['dc-publisher']

        abstract = json['dc-description-abstract']
    except KeyError:
        return False

    article = Article(title,abstract,date)

    db.session.add(article)

    def find_ent(names,table):
        for a in names:
            if table.query.filter_by(name=a).count() > 0:
                yield table.query.filter_by(name=a).first()
            else:
                ent = table(a)
                db.session.add(ent)
                yield ent

    authdb = [x for x in find_ent(authors,Author)]
    depdb = [x for x in find_ent(departments,Department)]
    pubdb = [x for x in find_ent([pub],Publication)][0]

    db.session.commit()

    for a in authdb:
        aa = ArticleAuthor(article.id,a.id)
        db.session.add(aa)
        db.session.commit()

    return True



def add_all():

    departs = defaultdict(list)

    for row in json.load(open("data/Articles-Departments.json"))['rows']:
        departs[row['Handle']].append(row['Departments'])

    ajson = json.load(open("data/Articles-Metadata.json"))

    y = 0
    n = 0
    for j in ajson:
        if add_article(j,departs):
            y += 1
        else:
            n += 1
        if (y+n) % 10 == 0:
            print "Good:",y,"Bad:",n

if __name__ == "__main__":
    add_all()
