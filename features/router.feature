Feature: Multicast
  As a developer
  I want to be able route exchanges to different outputs based on their content
  So that I keep routing and processing logic separate

  Scenario: Message should be sent to choice A
    Given a route "choice" which routes content based on the expressions:
      | action | expression           | append text       |
      | when   | message.body === "A" | -matched choice A |
      | when   | message.body === "B" | -matched choice B |
    When I send an exchange to the "choice" route with the body "A"
    Then the exchange body contains "A-matched choice A"

  Scenario: Message should be sent to choice B
    Given a route "choice" which routes content based on the expressions:
      | action | expression           | append text       |
      | when   | message.body === "A" | -matched choice A |
      | when   | message.body === "B" | -matched choice B |
    When I send an exchange to the "choice" route with the body "B"
    Then the exchange body contains "B-matched choice B"

  Scenario: Message should be sent to otherwise processor
    Given a route "choice" which routes content based on the expressions:
      | action    | expression           | append text            |
      | when      | message.body === "A" | -choiceA               |
      | when      | message.body === "B" | -choiceB               |
      | otherwise |                      | no expressions matched |
    When I send an exchange to the "choice" route with the body "NO MATCH - "
    Then the exchange body contains "NO MATCH - no expressions matched"
