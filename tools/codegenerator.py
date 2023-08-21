import qrcode
import csv

qr = qrcode.QRCode(
    version=1,
    error_correction=qrcode.constants.ERROR_CORRECT_L,
    box_size=10,
    border=2,
)

with open('../demodata/qr_codes_temp.csv') as csvfile:
    rd = csv.reader(csvfile, delimiter=';')
    count = 0
    for row in rd:
        count = count + 1;
        qr.clear()
        qr.add_data(row[0])
        qr.make(fit=True)

        img = qr.make_image(fill_color="black", back_color="white")
        img.save('../demodata/codes/'+row[1]+".png")

    print('Generated '+ str(count) + ' QR codes!')
