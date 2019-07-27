Please create an android react native app to show details of a single stock.
The application consists of 2 screens. The details are mentioned below.

1. Screen 1
a. The top panel shows a month calendar(check google calendar month view) :-
i. Stock prices by date.
ii. Add option for missing stock prices
iii. Delete option for existing stock prices.
b. The Bottom panel shows the following:-
i. Maximum profit that can be attained by buying and selling 10 units of the
stock only once.
ii. The graph showing the stock prices trend.
iii. Buy and the sell date.

2. Screen 2:
a. The Header
i. Back Button
b. The Form
i. Input field to enter stock price
ii. Button to add(or edit) stock price

Screen 1 Features:-
1. The top Panel
1. Stock prices are shown as small text just below the calendar date
2. Instead of creating an entire calendar, you can just create 3*3 grid view and show
data in that. Note that we only need stock prices for a month for this assignment
and since currently month is June which as 30 days, 10 rows and 3 columns
should be suffice.
3. For dataset please use Airtable. You can create data sets in airflow and call the
data using the Airtable API’s(https://airtable.com/)
4. On pressing any cell, the user should get navigated to screen 2.
2. The Bottom panel
1. You have to buy 10 units of the stock.
2. You can buy and sell only once. The aim is to make maximum profit.
3. Please use a plugin for displaying graphs.
4. The report will change in case you remove or add stock prices from the calendar

Screen 2 Features:-
1. The Header
a. On pressing back button the user should get navigated to screen 1
2. The Form
a. The Input field to take stock price(It should be prefilled in case of editing the stock
price for the current date).
b. The date field required by airtable API should be passed as props to this screen
from the screen 1.
c. On pressing the button, which can be either an edit or add, airtable data should
be updated and after a message confirmation dialogue screen should redirect to
screen 1.

Things to follow:-
● Writing test cases will fetch additional points.
● Create a public GitHub repository. (Share the link before starting the assignment.)
● Keep pushing your code in the repository.
● Make sure you have proper commit messages