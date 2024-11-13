# URL Shortener

A custom fully backend implementation of a URL shortening service.

*Just felt like brushing up some backend skills*

## Scripts

**`npm start`**

Starts the URL Shortener server

## Routes

- **Get** `/`

- **Get** `/url/[id] `
    
    Redirects to the target URL

- **Post** `/url`
    
    Creates a new short URL & Returns the short code

- **Get** `/url/[id]/analytics`
    
    Returns analytics for the selected url, such as targetURL, total visits, visit timestamps, etc...