const FULLSCREEN_ENABLED = true; // false for easy debugging

var lastUpdate = Date.now();

function getDeltaTime()
{
  var now = Date.now();
  var dt = now - lastUpdate;
  lastUpdate = now;

  return dt;
}

function compareFloat(a, b, error)
{
  return (a >= b - error && a <= b + error);
}

function pushArr(sumArr, addArr)
{
  for(let i = 0; i < addArr.length; i++)
    sumArr.push(addArr[i]);

  return sumArr;
}

class Vector2
{
    constructor(x, y)
    {
        this.x = typeof x == "undefined" ? 0 : x;
        this.y = typeof y == "undefined" ? 0 : y;
    }

    negative()
    {
        return new Vector2(-this.x, -this.y);
    }

    add(vec2)
    {
        return new Vector2(this.x + vec2.x, this.y + vec2.y);
    }

    subtract(vec2)
    {
        return new Vector2(this.x - vec2.x, this.y - vec2.y);
    }

    multiply(vec2)
    {
        return new Vector2(this.x * vec2.x, this.y * vec2.y);
    }

    divide(vec2)
    {
        return new Vector2(this.x / vec2.x, this.y / vec2.y);
    }

    invert()
    {
        return new Vector2(this.x * -1, this.y * -1);
    }

    distance(vec2)
    {
        return Math.sqrt( Math.pow(vec2.x - this.x, 2) + Math.pow(vec2.y - this.y, 2) );
    }

    angle(vec2)
    {
        return Math.atan2(this.y - vec2.y, this.x - vec2.x);
    }

    pointOnLine(vec2_a, vec2_b, error)
    {
      var distanceTest = compareFloat(vec2_a.distance(this) + this.distance(vec2_b), vec2_a.distance(vec2_b), error);
    
      if(compareFloat(vec2_a.x, this.x, error) && distanceTest) return compareFloat(vec2_b.x, this.x, error);
      if(compareFloat(vec2_a.y, this.y, error) && distanceTest) return compareFloat(vec2_b.y, this.y, error);

      return compareFloat((vec2_a.x - this.x)/(vec2_a.y - this.y), (this.x - vec2_b.x)/(this.y - vec2_b.y), error * 1000.0) && distanceTest;
    }
}

function isLineOnLine(
  x1, y1,
  x2, y2,
  x3, y3,
  x4, y4)
{
  var denominator = ((x1 - x2) * (y3 - y4)) - ((y1 - y2) * (x3 - x4));

  if(denominator != 0.0)
  {
    var t = (((x1 - x3) * (y3 - y4)) - ((y1 - y3) * (x3 - x4))) / denominator;
    if(t >= 0.0 && t <= 1.0)
    {
      var u = (((x1 - x2) * (y1 - y3)) - ((y1 - y2) * (x1 - x3))) / denominator;
      if(-u >= 0.0 && -u <= 1.0)
      {
        return true;
      }
      else
      {
        return false;
      }
    }
    else
    {
      return false;
    }
  }

  return false;
}

function vec2(x, y) { return new Vector2(x, y); }

function getDistBtwVec2(vec2_a, vec2_b)
{
    var diffY = vec2_a.y - vec2_b.y;
    var diffX = vec2_a.x - vec2_b.x;
    return Math.sqrt((diffY * diffY) + (diffX * diffX));
}

function isPointOnLine(vec2_a, vec2_b, vec2_c, error)
{
  var distanceTest = compareFloat(getDistBtwVec2(vec2_a, vec2_c) + getDistBtwVec2(vec2_c, vec2_b), getDistBtwVec2(vec2_a, vec2_b), error);
    
    if(compareFloat(vec2_a.x, vec2_c.x, error) && distanceTest) return compareFloat(vec2_b.x, vec2_c.x, error);
    if(compareFloat(vec2_a.y, vec2_c.y, error) && distanceTest) return compareFloat(vec2_b.y, vec2_c.y, error);

    return compareFloat((vec2_a.x - vec2_c.x)/(vec2_a.y - vec2_c.y), (vec2_c.x - vec2_b.x)/(vec2_c.y - vec2_b.y), error * 1000.0) && distanceTest;
}

function clamp(val, min, max)
{
	if (val < min)
		return min;
	else if (val > max)
		return max;
	
	return val;
}

function degToRad(val)
{
  return val * (Math.PI / 180.0);
}

function radToDeg(val)
{
  return val * (180.0 / Math.PI);
}

function lerp(val1, val2, amount)
{
	amount = amount < 0 ? 0 : amount;
	amount = amount > 1 ? 1 : amount;
	return (1 - amount) * val1 + amount * val2;
}

function lerpVec2(vec2_a, vec2_b, amount)
{
	amount = amount < 0 ? 0 : amount;
	amount = amount > 1 ? 1 : amount;
	return new Vector2((1.0 - amount) * vec2_a.x + amount * vec2_b.x, (1.0 - amount) * vec2_a.y + amount * vec2_b.y);
}

function drawRect(renderer, pos, size, doFill, color, roundedRadius)
{
  doFill = typeof doFill == "undefined" ? false : doFill;

  if(typeof roundedRadius != "undefined" && roundedRadius > 0)
  {
    drawRoundedRect(renderer, roundedRadius, pos, size, doFill, color);
    return;
  }
	
  if (doFill)
  {
    renderer.fillStyle = typeof color == "undefined" ? "#000000" : color;
    renderer.fillRect(pos.x, pos.y, size.x, size.y);
  }
  else
  {
    renderer.strokeStyle = typeof color == "undefined" ? "#000000" : color;
    renderer.strokeRect(pos.x, pos.y, size.x, size.y);
  }
}

function drawRoundedRect(renderer, radius, pos, size, doFill, color)
{
  doFill = typeof doFill == "undefined" ? false : doFill;

  if(size.x < radius) radius = size.x/4;
  if(size.y < radius) radius = size.y/4;
  if(size.x < radius) radius = size.x/4;
	
  if (doFill)
  {
    renderer.fillStyle = typeof color == "undefined" ? "#000000" : color;
    renderer.fillRect(pos.x + radius, pos.y, size.x - (radius * 2), size.y);
    renderer.fillRect(pos.x, pos.y + radius, size.x, size.y - (radius * 2));

    drawCircle(renderer, new Vector2( pos.x + radius + 1, pos.y + radius + 1), radius, true, color);
    drawCircle(renderer, new Vector2( pos.x + radius + 1, pos.y + size.y - radius - 1), radius, true, color);
    drawCircle(renderer, new Vector2( pos.x + size.x - radius - 1, pos.y + radius + 1), radius, true, color);
    drawCircle(renderer, new Vector2( pos.x + size.x - radius - 1, pos.y + size.y - radius - 1), radius, true, color);
  }
  else
  {
    renderer.strokeStyle = typeof color == "undefined" ? "#000000" : color;
    renderer.strokeRect(pos.x + radius, pos.y, size.x - radius, size.y);
    renderer.strokeRect(pos.x, pos.y + radius, size.x, size.y - radius);

    drawCircle(renderer, new Vector2( pos.x + radius + 1, pos.y + radius + 1), radius, false, color, 1);
    drawCircle(renderer, new Vector2( pos.x + radius + 1, pos.y + size.y - radius - 1), radius, false, color, 1);
    drawCircle(renderer, new Vector2( pos.x + size.x - radius - 1, pos.y + radius + 1), radius, false, color, 1);
    drawCircle(renderer, new Vector2( pos.x + size.x - radius - 1, pos.y + size.y - radius - 1), radius, false, color, 1);
  }
}

function drawRectWithPoints(renderer, vec2_a, vec2_b, doFill, color)
{
	doFill = typeof doFill == "undefined" ? false : doFill;
	
	var x, y, sizeX, sizeY;
	if(vec2_a.x <= vec2_b.x)
	{
		x = vec2_a.x;
		sizeX = vec2_b.x - vec2_a.x;
	}
	else
	{
		x = vec2_b.x;
		sizeX = vec2_a.x - vec2_b.x;
	}
	if(vec2_a.y <= vec2_b.y)
	{
		y = vec2_a.y;
		sizeY = vec2_b.y - vec2_a.y;
	}
	else
	{
		y = vec2_b.y;
		sizeY = vec2_a.y - vec2_b.y;
	}
	
	if (doFill)
  {
    renderer.fillStyle = typeof color == "undefined" ? "#000000" : color;
    renderer.fillRect(x, y, sizeX, sizeY);
  }
  else
  {
    renderer.strokeStyle = typeof color == "undefined" ? "#000000" : color;
    renderer.strokeRect(x, y, sizeX, sizeY);
  }
}

function drawCircle(renderer, pos, radius, doFill, color, lineWidth)
{
  doFill = typeof doFill == "undefined" ? false : doFill;

  renderer.beginPath();
  if(radius < 0) radius *= -1;
  renderer.arc(pos.x, pos.y, radius, 0, 2 * Math.PI, false);
  if(doFill)
  {
    renderer.fillStyle = color;
    renderer.fill();
  }
  renderer.lineWidth = typeof lineWidth == "undefined" ? 1 : lineWidth;
  renderer.strokeStyle = color;
  renderer.stroke();
}

function drawLine(renderer, vec2_a, vec2_b, color)
{
  renderer.beginPath();
  renderer.moveTo(vec2_a.x, vec2_a.y);
  renderer.lineTo(vec2_b.x, vec2_b.y);
  renderer.strokeStyle = typeof color == "undefined" ? "#000000" : color;
  renderer.stroke();
}

function drawText(renderer, text, pos, color)
{
  var lineHeight = renderer.measureText('M').width;
  renderer.fillStyle = typeof color == "undefined" ? "white" : color;
  if(typeof pos == "undefined") pos = new Vector2(0, lineHeight);
  renderer.fillText(text, pos.x, pos.y);
}

function rgb(r,g,b)
{
  r = r.toString(16);
  g = g.toString(16);
  b = b.toString(16);

  if (r.length == 1)
    r = "0" + r;
  if (g.length == 1)
    g = "0" + g;
  if (b.length == 1)
    b = "0" + b;

  return "#" + r + g + b;
}

function rgba(r,g,b,a)
{
  r = r.toString(16);
  g = g.toString(16);
  b = b.toString(16);
  a = Math.round(a * 255).toString(16);

  if (r.length == 1)
    r = "0" + r;
  if (g.length == 1)
    g = "0" + g;
  if (b.length == 1)
    b = "0" + b;
  if (a.length == 1)
    a = "0" + a;

  return "#" + r + g + b + a;
}

const ANCHOR_TOPLEFT = 0;
const ANCHOR_TOPRIGHT = 1;
const ANCHOR_BOTTOMRIGHT = 2;
const ANCHOR_BOTTOMLEFT = 3;
const ANCHOR_CENTER = 4;

function positionToAnchor(pos, size, anchor)
{
    anchor = typeof anchor == "undefined" ? ANCHOR_TOPLEFT : anchor;

    if (anchor == ANCHOR_TOPRIGHT)
    {
        pos.x = window.innerWidth - pos.x - size.x;
    }
    else if(anchor == ANCHOR_BOTTOMRIGHT)
    {
        pos.x = window.innerWidth - pos.x - size.x;
        pos.y = window.innerHeight - pos.y - size.y;
    }
    else if(anchor == ANCHOR_BOTTOMLEFT)
    {
        pos.y = window.innerHeight - pos.y - size.y;
    }
    else if(anchor == ANCHOR_CENTER)
    {
        pos.x = pos.x + (window.innerWidth/2) - (size.x/2);
        pos.y = pos.y + (window.innerHeight/2) - (size.y/2);
    }
    
    return pos;
}

function round(number, increment, offset)
{
    return Math.ceil((number - offset) / increment) * increment + offset;
}

function clipRect(renderer, pos, size)
{
  renderer.rect(pos.x, pos.y, size.x, size.y);
  renderer.clip();
}

const WINDOWS = 0;
const LINUX = 1;
const ANDROID = 2;

function getPlatform()
{
  var p = -1;
  if(window.navigator.platform.toString().indexOf('Win') > -1)
  {
    p = WINDOWS;
  }
  else if(window.navigator.platform.toString().indexOf('Linux') > -1)
  {
    p = LINUX;
    if(window.navigator.platform.toString().indexOf('armv8') > -1)
    {
        p = ANDROID;
    }
  }
  return p;
}

function getPixelDataRGBA(imgData, index)
{
  var i = index*4, d = imgData.data;
  return [d[i],d[i+1],d[i+2],d[i+3]];
}

function getPixelDataRGB(imgData, index)
{
  var i = index*4, d = imgData.data;
  return [d[i],d[i+1],d[i+2]];
}

function getPixelXY(imgData, x, y, w)
{
  return getPixelDataRGB(imgData, (y*w)+x);
}

function enablePointerLock(e)
{
  e.requestPointerLock = e.requestPointerLock || e.mozRequestPointerLock;
  e.requestPointerLock();
}

function disablePointerLock(e)
{
  e.exitPointerLock = e.exitPointerLock || e.mozExitPointerLock;
  e.exitPointerLock();
}

function enableFullScreen(e)
{
    if (!FULLSCREEN_ENABLED) return;

  try {
    if (e.requestFullscreen)
    e.requestFullscreen();
  else if (e.msRequestFullscreen)
    e.msRequestFullscreen();
  else if (e.mozRequestFullScreen)
    e.mozRequestFullScreen();
  else if (e.webkitRequestFullScreen)
    e.webkitRequestFullScreen();
  } catch(e) {
      console.log("browser refused fullscreen request. ignoring.")
  }
}

function disableFullscreen(e) 
{
  if (!FULLSCREEN_ENABLED) return;

  // FIXME: if user hits ESC while playing (or alt-tab etc) the game bugs out below
  // because we are not longer in fullscreen mode
  // solution: listen for exitfullscreen event and set FULLSCREEN_ENABLED to false
  if (e.exitFullscreen)
    e.exitFullscreen();
  else if (e.mozCancelFullScreen)
    e.mozCancelFullScreen();
  else if (e.webkitExitFullscreen)
    e.webkitExitFullscreen();
  else if (e.msExitFullscreen)
    e.msExitFullscreen();
}

// example:
// downloadString("a,b,c\n1,2,3", "text/plain", "myLevelData.txt")
function downloadString(text, fileType, fileName)
{
    var blob = new Blob([text], { type: fileType });
    var a = document.createElement('a');
    a.download = fileName;
    a.href = URL.createObjectURL(blob);
    a.dataset.downloadurl = [fileType, a.download, a.href].join(':');
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function() { URL.revokeObjectURL(a.href); }, 1500);
}

function writeFile(file, str)
{
    // FIXME: sanitize the input better!
    // watch for invalid filenames w backslashes etc
    if (!file || !file.length || !str || !str.length) return;
    console.log("Downloading a "+str.length+" byte text file named: " + file);
    downloadString(str,"text/plain",file);
}

function readFile(file)
{
    //console.log("reading level data: " + file);
    // post-release optimization: hardcoded level data used for lv 1 2 3 only
    if (file=="levels/lv1.txt") return LV1_DATA;
    if (file=="levels/lv2.txt") return LV2_DATA;
    if (file=="levels/lv3.txt") return LV3_DATA;

    console.log("WARNING: loading level data from disk!");
    // else, try loading using thread blocking ajax? FIXME
    var text = "";

    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", location.href.replace("index.html", "") + file, false);
    rawFile.onreadystatechange = function()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                text = rawFile.responseText;
            }
        }
    };
    
    rawFile.send(null);

    return text;
}

//SHORT FUNCTIONS
//A = anchor, V = viewport
//anchors: CLOCKWISE numbers
//top left = 0, bottom left = 3, center = 4
function vec2AV(x, y, sz, anc)
{
  return positionToAnchor(viewportToScreen(new Vector2(x, y)),
    sz, anc);
}
function vec2A(x, y, sz, anc)
{
  return positionToAnchor(new Vector2(x, y),
    sz, anc);
}
function vec2V(x, y)
{
  return viewportToScreen(new Vector2(x, y));
}

// NOTE: these are hardcoded (embedded) versions of the levels/lv?.txt files,
// put in code as a post-release optimization
// because out level loading ode was thread blocking
// and is due to be deprecieated in future browser versions
const LV1_DATA = "549 265.00000000000034 &53000 26800 57000 26800 0 3 53000 26800 53000 19799 9 53000 19999 57000 19999 10 57000 19799 57000 26800 9 3 53000 26800 53000 27800 9 53000 27700 57000 27700 10 57000 26800 57000 27800 9 1 51000 8899 59000 8899 0 0 0 0 0 0 51000 8899 59000 8899 0 4 50900 8999 50900 2999 4 50900 2999 54900 999 4 58900 8999 58900 2999 4 58900 2999 54900 999 4 2 50900 8899 54900 9899 4 54900 9899 58900 8899 4 1 61900 899 71900 899 0 0 0 0 0 2 53000 26800 57000 26800 0 0 0 0 0 53000 26800 57000 26800 0 0 0 0 0 61900 899 71900 899 0 4 62000 999 62000 -5000 5 62000 -5000 67000 -6000 5 67000 -6000 72000 -5000 5 72000 -5000 72000 999 5 2 66900 3999 61900 899 5 67000 3999 72000 899 5 1 77900 -7000 80900 -7000 0 0 0 0 0 1 51000 8899 59000 8899 0 0 0 0 0 77900 -7000 80900 -7000 0 6 77900 -7000 73900 -10000 18 80900 -7000 84900 -10000 18 74000 -10000 74000 -14000 20 74000 -14000 77000 -17000 19 82000 -17000 84900 -14000 19 84900 -14000 84900 -10000 20 3 78000 -3000 81000 -3000 8 77900 -3000 77900 -7000 17 80900 -3000 80900 -7000 17 1 77000 -17000 82000 -17000 0 0 0 0 0 1 61900 899 71900 899 0 0 0 0 0 77000 -17000 82000 -17000 0 3 77000 -17000 77000 -20000 21 81900 -17000 81900 -20000 21 77000 -20000 82000 -20000 22 6 77900 -7000 73900 -10000 18 80900 -7000 84900 -10000 18 74000 -10000 74000 -14000 20 74000 -14000 77000 -17000 19 82000 -17000 84900 -14000 19 84900 -14000 84900 -10000 20 1 89700 -21000 93699 -21000 0 0 0 0 0 1 77900 -7000 80900 -7000 0 0 0 0 0 89700 -21000 93699 -21000 0 3 95499 -25000 93699 -21000 11 87700 -25000 95499 -25000 12 87700 -25000 89700 -21000 11 3 89700 -21000 89700 -18000 11 89700 -18000 93699 -18000 12 93699 -21000 93699 -18000 11 0 1 77000 -17000 82000 -17000 0 0 0 0 0 &&941.9999999999953 -243 2 937.9999999999965 -239 27 923 -245 1 932.9999999999982 -234 2 926.9999999999982 -238 2 917 -242 31 908 -243 1 932.9999999999982 -219 2 920 -229 2 928.9999999999982 -222 27 924.9999999999995 -225 2 911 -234 2 920 -227 2 902 -238 2 887 -244 2 902 -231 27 893 -237 2 891 -238 27 897 -233 2 914 -216 2 902 -224 2 926.9999999999982 -204 2 926.9999999999982 -202 27 925.9999999999987 -191 2 901 -207 27 901 -205 2 917 -191 29 907 -193 2 794 -189 29 819 -165 1 824 -159 1 824 -155 18 829 -149 19 838 -142 19 812 -158 2 829 -145 21 802 -161 40 808 -154 2 799 -158 2 839 -129 2 790 -158 40 777 -164 27 809 -143 27 769 -163 1 823 -129 24 837 -114 23 797 -139 24 825 -120 2 763 -156 1 778 -146 20 758 -151 21 767 -146 20 829 -106 2 799 -125 2 775 -139 20 786 -126 2 828 -95 21 793 -113 2 753 -132 24 760 -126 2 769 -114 20 745 -126 2 785 -102 24 807 -84 2 768 -105 20 793 -88 2 748 -115 2 756 -109 15 794 -81 27 762 -99 20 782 -83 20 790 -75 2 759 -94 21 772 -83 20 795 -52 29 682 -53 2 705 -38 2 692 -28 2 651 -42 40 681 -28 2 711 -11 2 657 -32 2 629 -39 29 714 -1 2 688 -5 2 627 -25 19 662 -7 2 641 -13 10 654 -6 2 690 15.999999999999858 2 640 0 19 669 23.999999999999773 29 645 13.999999999999858 27 559 18.99999999999983 1 540 18.99999999999983 1 576 26.999999999999716 1 549 28.999999999999716 29 521 30.999999999999687 20 582 39.9999999999996 1 567 38.9999999999996 20 532 39.9999999999996 20 537 40.9999999999996 40 582 50.99999999999952 20 582 63.9999999999996 1 580 78.99999999999957 19 522 78.99999999999957 29 554 82.99999999999955 2 563 84.99999999999952 2 536 201.99999999999804 2 564 204.99999999999804 19 545 208.99999999999804 29 557.1791249149196 216.6135422631154 14 538 219.99999999999807 2 563 227.99999999999807 2 566 233.99999999999818 2 553 245.99999999999852 2 557 248.99999999999875 2 531 273.00000000000045 2 566 270.00000000000057 2 565 262.00000000000034 2 537 274.00000000000045 2 558 273.00000000000045 2 &";
const LV2_DATA = "433 249 &37500 20500 37500 24500 0 5 39500 15700 46500 15700 3 41500 14700 37500 20500 20 37500 24500 43500 26700 20 44500 14700 48500 20500 20 43500 26700 48500 24500 20 3 37500 20500 18700 20500 22 37500 24500 18700 24500 22 18700 20500 18700 24500 22 2 41500 14700 44500 14700 0 0 0 0 0 48500 20500 48500 24500 0 0 0 0 0 0 41500 14700 44500 14700 0 3 41500 14700 41500 10700 14 41500 10700 44500 10700 14 44500 10700 44500 14700 14 5 39500 15700 46500 15700 3 41500 14700 37500 20500 20 44500 14700 48500 20500 20 37500 24500 43500 26700 20 43500 26700 48500 24500 20 0 3 37500 20500 37500 24500 0 0 0 0 0 48500 20500 48500 24500 0 0 0 0 0 37500 20500 37500 24500 0 0 0 0 0 48500 20500 48500 24500 0 2 48500 20500 63700 20500 22 48500 24500 60700 24500 22 5 39500 15700 46500 15700 3 41500 14700 37500 20500 20 37500 24500 43500 26700 20 44500 14700 48500 20500 20 43500 26700 48500 24500 20 1 60700 24500 63700 20500 0 0 0 0 0 2 41500 14700 44500 14700 0 0 0 0 0 37500 20500 37500 24500 0 0 0 0 0 60700 24500 63700 20500 0 2 48500 20500 63700 20500 22 48500 24500 60700 24500 22 2 63700 20500 63700 28700 8 60700 24500 60700 28700 8 1 48500 20500 48500 24500 0 0 0 0 0 1 60700 28700 63700 28700 0 0 0 0 0 60700 28700 63700 28700 0 2 60700 24500 60700 28700 8 63700 20500 63700 28700 8 6 60700 28700 56700 31700 10 63700 28700 67700 31700 10 56700 31700 56700 35700 10 56700 35700 61700 38700 10 61700 38700 67700 35700 10 67700 31700 67700 35700 10 1 60700 24500 63700 20500 0 0 0 0 0 0 &&668 352 1 668 341 15 656 359 21 669 326 10 197 214 17 644 358 27 197 223 10 654 332 2 198 235 16 644.5 349 41 648 338 2 654 319 27 634 364 26 651 301 21 212.5 224 40 615 375 13 639 330 2 625 358 26 218 210 18 615.5 369 40 642 295 2 614 355 26 226 236 25 605 356 26 629 299 2 235 220 27 627 292 2 238 212 2 608 341 27 594 363 26 624 210 18 627 261 2 624 247 27 584 360 21 590.5 349 41 250 236 22 614 222 2 614 267 22 607 209 27 587 336 2 590 326 2 574 351 1 590 320 27 265 216 25 601.5 220 40 601 227 25 593 303 21 579 332 2 268 238 2 573 333 15 277 212 22 287 233 27 576 238 25 571 212 10 422 109 1 435 109 1 564 232 27 428 117 31 558 211 22 424 122 1 433 122 1 556 225 2 317 212 27 545 212 14 433 134 27 535 213 25 326 241 22 334 214 2 445 157 21 415 158 21 524 237 22 515 217 27 420 163 2 409.5 166 40 444.5 166 40 450 167 19 426.5 167 24 438.5 168 24 353 236 25 455 171 19 400 176 19 395 180 19 417 172 27 360 222 2 405 178 2 501 217 2 459 180 27 471 187 1 392 191 1 438 180 2 383 202 21 463 192 23 405 191 23 392 200 27 476 202 21 469 198 2 413 191 1 452 191 1 386 213 2 418 192 2 435 191 1 387 217 1 396 209 2 473 212 2 476 217 1 383 240 21 437 202 2 400 221 23 466 221 23 473 241 21 409 217 1 434 210 27 397 239 2 468 236 27 457 222 1 397 247 2 461 242 2 407 238 27 433 222 1 407 251 18 451 249 2 433 260 21 &";
const LV3_DATA = "525 199 &67000 18900 69000 21900 0 3 67000 18900 75000 14000 10 69000 21900 78000 16000 10 75000 14000 78000 16000 8 27 59000 18000 55000 18900 6 63000 18000 67000 18900 6 59000 18000 55000 18900 6 63000 18000 67000 18900 6 53000 21900 53000 27000 6 55000 30000 59000 31000 6 59000 31000 64000 31000 24 67000 30000 64000 31000 6 69000 21900 69000 27000 6 55000 18900 67000 18900 1 65000 18000 70000 23900 2 52000 24900 57000 31000 3 59000 18000 55000 18900 6 63000 18000 67000 18900 6 53000 21900 53000 27000 6 69000 21900 69000 27000 6 59000 18000 55000 18900 6 63000 18000 67000 18900 6 53000 21900 53000 27000 6 55000 30000 59000 31000 6 59000 31000 64000 31000 24 67000 30000 64000 31000 6 55000 18900 67000 18900 1 69000 27000 77000 32000 19 67000 30000 75000 35000 19 77000 32000 75000 35000 20 52000 24900 57000 31000 3 0 5 59000 18000 63000 18000 0 0 0 0 0 55000 18900 53000 21900 0 0 0 0 0 69000 27000 67000 30000 0 0 0 0 0 53000 27000 55000 30000 0 0 0 0 0 53000 27000 55000 30000 0 0 0 0 0 59000 18000 63000 18000 0 3 59000 18000 59000 8000 12 63000 18000 63000 8000 12 59000 8000 63000 8000 12 10 59000 18000 55000 18900 6 63000 18000 67000 18900 6 53000 21900 53000 27000 6 69000 21900 69000 27000 6 55000 30000 59000 31000 6 67000 30000 64000 31000 6 59000 31000 64000 31000 24 55000 18900 67000 18900 1 65000 18000 70000 23900 2 52000 24900 57000 31000 3 0 4 55000 18900 53000 21900 0 0 0 0 0 67000 18900 69000 21900 0 0 0 0 0 53000 27000 55000 30000 0 0 0 0 0 69000 27000 67000 30000 0 0 0 0 0 55000 18900 53000 21900 0 10 59000 18000 55000 18900 6 63000 18000 67000 18900 6 53000 21900 53000 27000 6 55000 30000 59000 31000 6 59000 31000 64000 31000 24 67000 30000 64000 31000 6 69000 21900 69000 27000 6 55000 18900 67000 18900 1 52000 24900 57000 31000 3 65000 18000 70000 23900 2 3 55000 18900 53000 17000 5 53000 21900 50000 21900 5 50000 21900 53000 17000 5 4 59000 18000 63000 18000 0 0 0 0 0 53000 27000 55000 30000 0 0 0 0 0 69000 27000 67000 30000 0 0 0 0 0 67000 18900 69000 21900 0 0 0 0 0 0 69000 27000 67000 30000 0 3 69000 27000 77000 32000 19 67000 30000 75000 35000 19 77000 32000 75000 35000 20 23 59000 18000 55000 18900 6 63000 18000 67000 18900 6 53000 21900 53000 27000 6 69000 21900 69000 27000 6 59000 18000 55000 18900 6 63000 18000 67000 18900 6 53000 21900 53000 27000 6 55000 30000 59000 31000 6 59000 31000 64000 31000 24 67000 30000 64000 31000 6 59000 18000 55000 18900 6 63000 18000 67000 18900 6 53000 21900 53000 27000 6 69000 21900 69000 27000 6 59000 18000 55000 18900 6 63000 18000 67000 18900 6 53000 21900 53000 27000 6 55000 30000 59000 31000 6 59000 31000 64000 31000 24 67000 30000 64000 31000 6 55000 18900 67000 18900 1 65000 18000 70000 23900 2 52000 24900 57000 31000 3 0 4 59000 18000 63000 18000 0 0 0 0 0 55000 18900 53000 21900 0 0 0 0 0 67000 18900 69000 21900 0 0 0 0 0 53000 27000 55000 30000 0 0 0 0 0 53000 27000 55000 30000 0 16 59000 18000 55000 18900 6 63000 18000 67000 18900 6 53000 21900 53000 27000 6 69000 21900 69000 27000 6 59000 18000 55000 18900 6 63000 18000 67000 18900 6 53000 21900 53000 27000 6 55000 30000 59000 31000 6 59000 31000 64000 31000 24 67000 30000 64000 31000 6 55000 18900 67000 18900 1 69000 27000 77000 32000 19 67000 30000 75000 35000 19 77000 32000 75000 35000 20 52000 24900 57000 31000 3 65000 18000 70000 23900 2 3 53000 27000 45000 32000 16 45000 32000 47000 35000 16 55000 30000 47000 35000 16 5 59000 18000 63000 18000 0 0 0 0 0 55000 18900 53000 21900 0 0 0 0 0 69000 27000 67000 30000 0 0 0 0 0 69000 27000 67000 30000 0 0 0 0 0 67000 18900 69000 21900 0 0 0 0 0 0 &&755 327 12 751.5 322 27 741 336 15 740.5 325 40 746.5 311 40 743 309 22 731 328 15 761 153 13 738 307 27 729 317 40 725 322 14 748 148 10 726.5 307 27 746.5 158 27 746.5 161 40 713 321 22 746 177 22 723 297 23 743.5 177 40 742 171 27 709.5 307 27 713.5 297 27 704 311 18 732 159 22 730 171 40 701 299 27 726 183 23 706 286 22 692 305 22 720.5 183 27 714 171 27 689.5 292 24 692.5 281 24 680.5 298 24 708 197 27 700.5 181 27 701 203 22 693.5 189 25 691 180 22 690.5 200 25 683.5 191 25 475 335 10 613 86 32 465 328 11 619.5 101 41 624 110 22 478 323 40 606 98 27 485.5 322 27 493 324 22 467.5 312 27 607 103 41 494.5 321 40 614.5 112 26 505 319 18 616 119 41 482.5 309 40 619 130 27 481 305 22 596 110 22 495 308 27 603.5 118 27 508 310 23 526 309 22 599 119 41 604.5 126 26 609.5 132 41 618 145 23 623 158 22 529.5 302 27 596.5 127 26 618.5 160 27 509.5 298 27 536.5 298 20 601.5 137 27 499.5 294 20 599 136 23 524 294 27 513 288 22 526.5 283 20 596 155 22 602 170 27 531 179 10 512 212 10 541 190 17 523 212 16 531 188 17 519 201 27 &";
