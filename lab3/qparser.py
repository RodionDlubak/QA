from selenium import webdriver
import time
from selenium.webdriver.support.ui import Select

url = "http://www.fb.com"
driver = webdriver.Chrome(executable_path="C:\\Users\\User\\Desktop\\КПИ\\lab3\\chromedriver_win32\\chromedriver")

try:
    driver.get(url)
    driver.implicitly_wait(1)
    if driver.current_url == "https://www.facebook.com/":
        print("OK: Page is redirected to https://www.facebook.com/")
    else:
        print("FAIL: Page is not redirected to https://www.facebook.com/")
        driver.quit()
    reg_btn = driver.find_element_by_link_text("Создать новый аккаунт")
    if reg_btn:
        print("OK: There is registration button on the page")
    else:
        print("FAIL: There are no registration button on the page")
    reg_btn.click()  
    time.sleep(1)

    driver.find_element_by_name("firstname").send_keys("Rodion")  
    driver.find_element_by_name("lastname").send_keys("Dlubak") 
    driver.find_element_by_name("reg_email__").send_keys("somemail@gmail.com") 
    driver.find_element_by_name("reg_email_confirmation__").send_keys("somemail@gmail.com")  
    driver.find_element_by_name("reg_passwd__").send_keys("strongpass")

    Select(driver.find_element_by_name('birthday_day')).select_by_visible_text('3')
    Select(driver.find_element_by_name('birthday_month')).select_by_visible_text('июн')
    Select(driver.find_element_by_name('birthday_year')).select_by_visible_text('2001')
    
    driver.find_elements_by_name("sex")[1].click()
    time.sleep(1)
    driver.find_elements_by_tag_name("button")[1].click()
    
    for i in range(20):
        if driver.current_url == "https://www.facebook.com/":
            print("Waiting...")
            time.sleep(1)
        elif i == 20:
            print("Timeout")
            exit

    confirmation_field = driver.find_element_by_name("n")
    if confirmation_field:
        print("SUCCESS!")
        time.sleep(10)
    else:
        print("FAILURE(")
        
except Exception as ex:
    print(ex)
    print("Some exception occured")
finally:
    driver.close()
    driver.quit()
