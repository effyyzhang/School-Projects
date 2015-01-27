from webapp import db

class Article(db.Model):

    id = db.Column(db.BigInteger, primary_key=True)
    title = db.Column(db.String)
    abstract = db.Column(db.String)
    date = db.Column(db.Date)
    lic = db.Column(db.String) 
    pub = db.Column(db.String)



    def __init__(self, title, abstract, date, lic, pub):
        self.title = title
        self.abstract = abstract
        self.date = date
        self.lic = lic
        self.pub = pub

class Author(db.Model):

    id = db.Column(db.BigInteger, primary_key=True)
    name = db.Column(db.String)

    def __init__(self, name):
        self.name = name

class Department(db.Model):
    id = db.Column(db.BigInteger, primary_key=True)
    name = db.Column(db.String)

    ads = db.relationship('ArticleDept', backref = 'ent', lazy = 'dynamic')

    def __init__(self, name):
        self.name = name

class ArticleAuthor(db.Model):
    
    id = db.Column(db.Integer, primary_key = True)
    art = db.Column(db.BigInteger, db.ForeignKey('article.id'))
    auth = db.Column(db.BigInteger, db.ForeignKey('author.id'))

    def __init__(self, art, auth):
        self.art = art
        self.auth = auth

class ArticleDept(db.Model):
    
    id = db.Column(db.Integer, primary_key = True)
    art = db.Column(db.BigInteger, db.ForeignKey('article.id'))
    dept = db.Column(db.BigInteger, db.ForeignKey('department.id'))

    def __init__(self, art, dept):
        self.art = art
        self.dept = dept
