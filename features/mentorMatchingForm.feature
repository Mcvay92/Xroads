Feature: Mentor Matching
    In order to be matched with a mentor
    As a startup
    I want to be able to be matched with a mentor

    Scenario Outline: Entering data into the form
    Given I am at the mentor matching form page
    When I enter values
    Then I should see those values added

    Examples:
        | navtab           | url                                    |
        | 'hometab'        | 'http://localhost:3000/'               |

    Scenario Outline: Submit form when it is not filled out
    Given I am at the mentor matching form page
    When I submit before everything is filled out
    Then the submit should fail on the mentor matching form

    Examples:
        | navtab           | url                                    |
        | 'hometab'        | 'http://localhost:3000/'               |

    Scenario Outline: Submit filled out form
    Given I am at the mentor matching form page
    When I submit the filled out form on the mentor matching form
    Then the submit should succeed on the mentor matching form

    Examples:
        | navtab           | url                                    |
        | 'hometab'        | 'http://localhost:3000/'               |
