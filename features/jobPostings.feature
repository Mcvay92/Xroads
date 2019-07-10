Feature: Viewing Jobs
    In order to see the posted jobs
    As a general user
 i   I want to see the posted jobs

    Scenario Outline: Load page and see jobs posted
    Given I am at the job posting page
    Then I should see some jobs

    Examples:
        | navtab           | url                                    |
        | 'hometab'        | 'http://localhost:3000/'               |

