FROM alpine

RUN apk add --update curl bash && \
		rm -rf /var/cache/apk/*