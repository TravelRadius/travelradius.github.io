#from bs4 import BeautifulSoup
import urllib
import re


#url = "http://www.annarborgasprices.com/index.aspx?area=Ann%20Arbor%20-%20Central&area=Ann%20Arbor%20-%20East&area=Ann%20Arbor%20-%20NE&area=Ann%20Arbor%20-%20North&area=Ann%20Arbor%20-%20SE&area=Ann%20Arbor%20-%20South&area=Ann%20Arbor%20-%20SW&area=Ann%20Arbor%20-%20West&area=Barton%20Hills"


#soup = BeautifulSoup(urllib.urlopen(url).read())
#def getCost(url):

def findInfo(url):
	parse1 = urllib.urlopen(url).read()
	parse1 = parse1.split("rrlow_0")
	parse1 = parse1[1].split("rrlow_1")
	parse2 = parse1[0]
	parseCost = re.findall('<div class=\"sp_p\".*div>?', parse1[0])
	costString = re.findall('\"p[\w|\d]\"', parse1[0])
	cost = ""
	for each in costString:
		if (each[2] == 'd'):
			cost += '.'
		else:
			cost+= each[2]
	address = re.findall('<dd>(.*)</dd>?', parse1[0])
	return {price: cost, location: address[0]}
"""
cost = ""
firstLine = False
for each in parse2:
	if (firstLine):
		if each[2] == "d":
			cost += "."
		else:
			cost += each[2]
	else:
		firstLine = True
#return cost = float(cost)
cost = float(cost)
"""
"""
s = open("output", 'w')

parse1 = str(parse1)
s.write(parse1)
s.close()
parse1 = re.sub('(class="sp_p".*/a)', '\g<1>', parse1)
print parse1
#line = re.sub('\s\+\s', ' ', line)
"""