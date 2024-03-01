import html
from http import HTTPStatus
import io
import json
import os
import sys 
import http.server



import argparse
from typing import overload

# create an ArgumentParser object
parser = argparse.ArgumentParser(description="run jupyter js")

# add two arguments to the parser
parser.add_argument('--directory', '-d', default=os.getcwd(),
                        help='Specify alternative directory '
                        '[default:current directory]')

parser.add_argument('port', action='store',
                        default=80, type=int,
                        nargs='?',
                        help='Specify alternate port [default: 8000]')

args = parser.parse_args()


import http.server
import urllib.parse
class MyHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        # Parse the path and query parameters
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path
        query = urllib.parse.parse_qs(parsed.query)
        self.tree = False
        if (query.get("tree")):
            if (query["tree"][0] == "true"):
                self.tree = True
            
        return super().do_GET()

    def list_directory(self, path):
        try:
            list = os.listdir(path)
            # print(path)
            # print(list)
        except OSError:
            self.send_error(
                HTTPStatus.NOT_FOUND,
                "No permission to list directory")
            return None
        list.sort(key=lambda a: a.lower())
        try:
            displaypath = urllib.parse.unquote(self.path,
                                               errors='surrogatepass')
        except UnicodeDecodeError:
            displaypath = urllib.parse.unquote(path)
        displaypath = html.escape(displaypath, quote=False)
        enc = sys.getfilesystemencoding()
        if (self.tree):
            result = self.dir_to_dict(path)
        else:
            result = self.list_items(path ,list)

        encoded = json.dumps(result).encode(enc, 'surrogateescape')
        f = io.BytesIO()
        f.write(encoded)
        f.seek(0)
        self.send_response(HTTPStatus.OK)
        self.send_header("Content-type", "text/html; charset=%s" % enc)
        self.send_header("Content-Length", str(len(encoded)))
        self.end_headers()
        return f
    
    def list_items(self ,path ,list):
        result = dict()
        for name in list:
            fullname = os.path.join(path, name)
            displayname = linkname = name
            types = 'file'
            # Append / for directories or @ for symbolic links
            if os.path.isdir(fullname):
                displayname = name + "/"
                linkname = name + "/"
                types = 'dir'
            if os.path.islink(fullname):
                displayname = name + "@"
                types = 'link'
                # Note: a link to a directory displays with @ and links with /
            a , b = f'{urllib.parse.quote(linkname,errors="surrogatepass")}' ,f'{html.escape(displayname, quote=False)}'
            result[a] = types
        return result

    def dir_to_dict_(self ,path):
        # اگر path یک فایل باشد، خود path را برگردان
        if os.path.isfile(path):
            return 1
        # در غیر این صورت، یک دیکشنری خالی بساز
        result = {}
        # برای هر زیر دایرکتوری و فایل در path
        for item in os.listdir(path):
            # مسیر کامل آن را بساز
            item_path = os.path.join(path, item)
            # به صورت بازگشتی تابع را بر روی آن فراخوانی کن و نتیجه را به دیکشنری اضافه کن
            result[item] = self.dir_to_dict(item_path)
        # دیکشنری حاصل را برگردان
        return result
    
    def dir_to_dict(self ,path):
        l = path.split("/")
        pkg = l[-2]
        if (len(l) == 2): 
            pkg = l[0].split("\\")[-1]
        
        result = {pkg:[]}
        for item in os.listdir(path):
            item_path = os.path.join(path, item)
            if os.path.isfile(item_path):
                result[pkg].append(item)
            else:
                result[pkg].append(self.dir_to_dict(item_path+'/'))
        return result


if __name__ == "__main__":
    server = http.server.HTTPServer(("", args.port), MyHandler)
    server.RequestHandlerClass.directory = args.directory
    print(f"Serving <<<{args.directory}>>> \non port <<<{args.port}>>>") 
    print(f"http://localhost:{args.port}/")
    server.serve_forever()