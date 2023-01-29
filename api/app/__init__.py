import logging

from flask import Flask, request as req

from app.controllers.routes import cluster
from app.controllers.routes import data
from app.controllers.routes import personal



def create_app(config_filename):
    app = Flask(__name__)
    app.config.from_object(config_filename)
    app.config['SECRET_KEY'] = 'secret'
    app.register_blueprint(cluster.blueprint)
    app.register_blueprint(data.blueprint)
    app.register_blueprint(personal.blueprint)

 
    app.logger.setLevel(logging.NOTSET)
    routes = []
    for rule in app.url_map.iter_rules():
        routes.append({'methods': list(rule.methods), 'route': rule.rule})
        print(rule.methods,rule.rule)
 
    @app.after_request
    def log_response(resp):
        app.logger.info("{} {} {}\n{}".format(
            req.method, req.url, req.data, resp)
        )
        return resp

    return app
