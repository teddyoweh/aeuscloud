from app import create_app


app = create_app('config.development')
app.config['CORS_HEADERS'] = 'Content-Type'
host = '0.0.0.0'
if __name__ == '__main__':
    app.run()
