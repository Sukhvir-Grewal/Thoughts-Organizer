dis = 0
bin = 0b00000010100101000001111010011100
stringed_n = str(bin)
reversed_n =  stringed_n[::-1]

dis = 0



str_bin_len = len(reversed_n)
for i in range(str_bin_len,0,-1):
    dis += pow(2,i-1) * int(reversed_n[str_bin_len - i])
    


print(dis)
