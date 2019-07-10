Feature: Navigating the website
    In order to traverse different parts of the site
    As a general user
    I want to click on different links in the Navbar to go to other parts of the site

    Scenario Outline: Using the navbar to navigate the website
    Given I am at the home page of the website
    When I click the tab with ID <navtab>
    Then I should be at <url>

    Examples:
        | navtab           | url                                    |
        | 'hometab'        | 'http://localhost:3000/'               |
        | 'jobstab'        | 'http://localhost:3000/jobPostingForm' |  
        | 'calendartab'    | 'http://localhost:3000/calendar'       |
        | 'guidetab'       | 'http://localhost:3000/howtostartup'   |