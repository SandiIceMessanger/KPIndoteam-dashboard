#!/bin/sh

service nginx restart

NODE_ENV=${NODE_ENV} npm run start
