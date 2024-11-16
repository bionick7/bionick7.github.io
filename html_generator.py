import os, re

HEADER = """
<head>
  <title> Nick Felten's personal site </title>

  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="author" content="Nick Felten">
  <meta name="keywords" content="">
  <!--<link rel="icon" type="image/x-icon" href="/images/favicon.ico">-->

  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Space+Mono">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <link rel="stylesheet" href="/style/stylesheet.css"></style>

  <script src="/Portfolio/data.js"></script>
  <script src="/source.js"></script>
</head>
"""

def change_header(filepath: str):
    print(f"modifying {filepath}")
    with open(filepath, "r") as f:
        str = f.read()
    
    str = re.sub("<head>.*</head>", HEADER, str)
    #str = str.replace("<body", '<body onload="on_load();"')

    with open(filepath, "w") as f:
        f.write(str)


def plug_header():
    for root, dirs, files in os.walk("."):
        for filename in files:
            if filename.endswith(".html"):
                change_header(os.path.join(root, filename))


def generate_portfolio():
    with open("_portfolio_template.html") as f:
        template = f.read()
    inner = '<div class="picture-grid">\n'

    for filename in os.listdir("Portfolio"):
        filepath = f'"Portfolio/{filename}"'
        inner += f'      <img class="portfolio-img" onclick=\'show_img({filepath})\' src={filepath} alt="{filename}">\n'

    inner += '    </div>\n'

    template = template.replace("{{content}}", inner)

    with open("portfolio.html", "w") as f:
        f.write(template)


if __name__ == "__main__":
    plug_header()
