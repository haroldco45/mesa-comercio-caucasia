from comun import *
W,H=1080,1350
im=Image.new('RGB',(W,H),NOCHE)
FOTO='foto2.jpg'
TOP=760
foto=cover(Image.open(F+FOTO).convert('RGB'),W,TOP)
im.paste(foto,(0,0))
g=Image.new('L',(1,TOP))
for y in range(TOP):
    u=max(0,min(1,(y/TOP-0.42)/0.58)); g.putpixel((0,y),int(255*(0.10+0.90*u*u*(3-2*u))))
im.paste(Image.new('RGB',(W,TOP),NOCHE),(0,0),g.resize((W,TOP)))
# resplandor de amanecer arriba a la derecha
luz=Image.new('L',(W,H)); ImageDraw.Draw(luz).ellipse((620,-260,1300,420),fill=120); luz=luz.filter(ImageFilter.GaussianBlur(120))
im.paste(Image.new('RGB',(W,H),(255,150,40)),(0,0),luz)
d=ImageDraw.Draw(im)
d.rounded_rectangle((50,50,122,122),18,fill=ORO); d.text((86,86),'MC',font=font(ARCH,30),fill=NOCHE,anchor='mm')
d.text((140,86),'Vibras Positivas HM',font=font(FIRAB,32),fill=BLANCO,anchor='lm')
et='CAUCASIA · MESA DEL COMERCIO AL DÍA'; f=font(FIRAB,27); w=d.textlength(et,font=f)
d.rounded_rectangle((60,410,60+w+40,462),26,fill=(0,0,0)); d.rounded_rectangle((60,410,60+w+40,462),26,outline=ORO,width=2)
d.text((80,436),et,font=f,fill=ORO2,anchor='lm')
d.text((56,478),'ENTRE TODOS SACAMOS',font=font(ANTON,88),fill=BLANCO)
texto_sol(im,(52,578),'A CAUCASIA ADELANTE',font(ANTON,108),brillo=.55)
for (x,y,r) in [(1005,600,22),(990,470,12)]: destello(im,x,y,r)
d=ImageDraw.Draw(im)
d.text((60,728),'Que no sean solo palabras: necesitamos hechos.',font=font(FIRASB,38),fill=(255,236,200))
# tira de fotos reales
tira=['foto9.jpg','foto5.jpg','foto8.jpg','foto3.jpg']; tw=(W-100-3*14)//4; ty=800; th=190
for k,fn in enumerate(tira):
    x=50+k*(tw+14); ph=cover(Image.open(F+fn).convert('RGB'),tw,th)
    m=Image.new('L',(tw,th)); ImageDraw.Draw(m).rounded_rectangle((0,0,tw-1,th-1),20,fill=255)
    im.paste(ph,(x,ty),m)
d=ImageDraw.Draw(im)
# temas
temas=['Espacio público','Obras en la vía','Alumbrado','Impuestos']
x=50; y=1012
for tx in temas:
    f=font(FIRAB,27); w=d.textlength(tx,font=f)
    d.rounded_rectangle((x,y,x+w+36,y+50),25,fill=(19,35,61),outline=(255,160,60),width=2)
    d.text((x+18,y+25),tx,font=f,fill=BLANCO,anchor='lm'); x+=w+36+12
# pie con QR
d.rounded_rectangle((50,1085,W-50,1300),28,fill=BLANCO)
q=qr(180); im.paste(q,(72,1103))
d=ImageDraw.Draw(im)
d.text((275,1105),'Siga cada compromiso',font=font(FIRAB,36),fill=NOCHE)
for k,l in enumerate(['Tablero con fechas y responsables','Su voz por WhatsApp · Noticias cada 30 min','Derecho de petición · Español e inglés']):
    d.rectangle((277,1165+k*36,287,1175+k*36),fill=NARANJA); d.text((300,1155+k*36),l,font=font(FIRA,26),fill=(40,46,60))
d.text((275,1290),URL,font=font(FIRAB,32),fill=(200,80,20),anchor='ls')
d.text((W-50,1336),'Fotos: El Colombiano (Grandes historias empresariales del Bajo Cauca)  ·  WhatsApp 311 770 0431',font=font(FIRA,18),fill=(185,190,205),anchor='rs')
out=os.path.join(AQUI,'..')
im.save(out+'/flyer-mesa-comercio-caucasia.png'); im.save(out+'/flyer-mesa-comercio-caucasia.jpg',quality=92)
print('flyer listo')
