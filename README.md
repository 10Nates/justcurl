# JustCurl 

 - ***Version 1.0.3***
 - ***[By Nathan Hedge](https://github.com/10nates)***

**WARNING: Make sure to sanitize any user input. Some precautions are already taken, but it's in no way perfect.**

&nbsp;
[JustCurl](https://github.com/10nates/justcurl) is a wrapper for the command line cURL interface using child_process. It provides simple interaction with the command line cURL interface. 

It also allows for pure JS synchronous low-latency connections.

---
### Examples:
```js
//import
const  jc = require('justcurl');
//ES6: import { get, post, direct } from  '../index'

//GET requests
var get = jc.get('https://example.com', {'query': 'example'}, {'header': 'example'});

//POST requests
var post = jc.post('https://example.com', {'post':  'example'}, {'headers':  'example'});

//just throws it into "curl [curl options]"
var dir = jc.direct('[curl options]');

//Error handling
if (typeof get /*or post or dir*/ === 'object') {
    console.log("Oops! An error has occured.")
} else {
    console.log(get) //result
}
```

----
### Notes:
- You must have cURL installed on your device for this to function properly. Otherwise, there will be no command for it to call.
- In regards to sanitized input, queries and post data are the most sanitized, as they run entirely through a parser. Headers attempt to backslash quotations, but it can still be circumvented. URLs are not sanitized.
- Errors are always handled (unless there's a bug) so you should always check if the output is an Error object. All regular outputs are strings.