Feature: Navigating from the home page
    In order to navigate the website
    As a user
    I want to be able to navigate the website

    Scenario Outline: Navigate to the Jobs page
    Given I am at the home page
    When I click the jobs page link
    Then I should be on the jobs page

    Examples:
        | navtab           | url                                    |
        | 'hometab'        | 'http://localhost:3000/'               |

    Scenario Outline: Navigate to the events page
    Given I am at the home page
    When I click the events page link
    Then I should be on the events page

    Examples:
        | navtab           | url                                    |
        | 'hometab'        | 'http://localhost:3000/'               |

    Scenario Outline: Navigate to the mentor page
    Given I am at the home page
    When I click the mentor page link
    Then I should be on the mentor page

    Examples:
        | navtab           | url                                    |
        | 'hometab'        | 'http://localhost:3000/'               |

    Scenario Outline: Navigate to the roadmap page
    Given I am at the home page
    When I click the roadmap page link
    Then I should be on the roadmap page

    Examples:
        | navtab           | url                                    |
        | 'hometab'        | 'http://localhost:3000/'               |
