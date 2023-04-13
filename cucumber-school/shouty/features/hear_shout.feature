Feature: Hear shout

  Rule: Shouts can be heard by other users

    Background: 
      Given a person named Lucy
      And a person named Sean

    Scenario: Listener hears a message
      When Sean shouts "free bagels at Sean's"
      Then Lucy hears Sean's message

    Scenario: Listener hears a different message
      When Sean shouts "Free coffee!"
      Then Lucy hears Sean's message
