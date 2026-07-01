# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end
messages = [
  "Hey, how are you?",
  "What's up?",
  "How's your day going?",
  "Did you finish the project?",
  "Let's catch up later.",
  "I'll call you in a bit.",
  "Can you send me the file?",
  "That sounds great!",
  "I'm not sure about that.",
  "Let me think about it.",
  "Sounds like a plan.",
  "Where are you now?",
  "I'm on my way.",
  "Running a bit late, sorry!",
  "No worries at all.",
  "See you soon.",
  "Thanks a lot!",
  "I appreciate it.",
  "Could you help me with this?",
  "I'll check and get back to you.",
  "That's interesting.",
  "Tell me more.",
  "I didn't know that.",
  "Makes sense.",
  "Totally agree.",
  "I disagree with that.",
  "Let's discuss this.",
  "We need a plan.",
  "This is urgent.",
  "Handle this ASAP.",
  "Good morning!",
  "Good afternoon!",
  "Good evening!",
  "Good night!",
  "Talk to you later.",
  "Catch you later.",
  "Long time no see!",
  "How have you been?",
  "Everything okay?",
  "Hope you're doing well.",
  "That was funny",
  "Haha, nice one!",
  "You're kidding, right?",
  "Seriously?",
  "No way!",
  "That's crazy.",
  "Unbelievable.",
  "I'm excited!",
  "Can't wait!",
  "Looking forward to it.",
  "This is awesome!",
  "Not bad at all.",
  "Could be better.",
  "I've seen worse.",
  "This is perfect.",
  "Exactly what I needed.",
  "Thanks for the update.",
  "Keep me posted.",
  "Any news?",
  "What's the status?",
  "Did it work?",
  "It works now!",
  "Found the issue.",
  "Fixed it.",
  "Still debugging.",
  "This bug is annoying.",
  "Finally done!",
  "Pushed the changes.",
  "Check the repo.",
  "Review it when you can.",
  "Looks good to me.",
  "Approved.",
  "Needs some changes.",
  "Let's refactor this.",
  "We can optimize that.",
  "Performance looks better now.",
  "Deployment failed.",
  "Retrying deployment.",
  "Server is down.",
  "It's back online.",
  "Database issue again.",
  "All systems operational.",
  "Can we schedule a meeting?",
  "Let's meet tomorrow.",
  "Same time as usual?",
  "Works for me.",
  "I can't make it.",
  "Let's reschedule.",
  "Ping me when you're free.",
  "Are you available?",
  "Quick question.",
  "Give me a minute.",
  "Almost done.",
  "Wrapping up now.",
  "Just started working on it.",
  "Taking a short break.",
  "Back in 10 minutes.",
  "Let's ship it",
  "Great job everyone!",
  "We did it!",
  "On to the next task.",
];

users =  [
  {
    username: "oliver92",
    email: "oliver.smith@gmail.com",
    password: "password123",
  },
  {
    username: "geo_dev",
    email: "george.brown@outlook.com",
    password: "password123",
  },
  {
    username: "harry.codes",
    email: "harry.wilson@yahoo.com",
    password: "password123",
  },
  {
    username: "jack_01",
    email: "jack.taylor@gmail.com",
    password: "password123",
  },
  {
    username: "noahx",
    email: "noah.anderson@proton.me",
    password: "password123",
  },
  {
    username: "charlie.dev",
    email: "charlie.thomas@gmail.com",
    password: "password123",
  },
  {
    username: "tommy99",
    email: "thomas.jackson@outlook.com",
    password: "password123",
  },
  {
    username: "oscar_live",
    email: "oscar.white@yahoo.com",
    password: "password123",
  },
  {
    username: "james.codes",
    email: "james.harris@gmail.com",
    password: "password123",
  },
  {
    username: "will_tech",
    email: "william.martin@icloud.com",
    password: "password123",
  },

  {
    username: "olivia_x",
    email: "olivia.thompson@gmail.com",
    password: "password123",
  },
  {
    username: "emma.dev",
    email: "emma.garcia@outlook.com",
    password: "password123",
  },
  {
    username: "ava.codes",
    email: "ava.martinez@yahoo.com",
    password: "password123",
  },
  {
    username: "sophia01",
    email: "sophia.robinson@gmail.com",
    password: "password123",
  },
  {
    username: "bella_live",
    email: "isabella.clark@proton.me",
    password: "password123",
  },
  {
    username: "mia_tech",
    email: "mia.rodriguez@gmail.com",
    password: "password123",
  },
  {
    username: "amelia.dev",
    email: "amelia.lewis@icloud.com",
    password: "password123",
  },
  {
    username: "harper99",
    email: "harper.lee@yahoo.com",
    password: "password123",
  },
  {
    username: "eve.codes",
    email: "evelyn.walker@gmail.com",
    password: "password123",
  },
  {
    username: "abby01",
    email: "abigail.hall@outlook.com",
    password: "password123",
  },
];

demo = User.create!(
    email: 'demo@flash.com',
    password: '12345678',
    username: Faker::Internet.unique.username
)
puts "[Seed] demo"
friend = User.create(users[0])
puts "[Seed] friend"
users[1..].each { |user| User.create(user) }
puts "[Seed] users"
chat = Chat.new(user_id: demo.id)
chat.recipient_id = friend.id
chat.save
puts "[Seed] chat"
messages.each_with_index do |message, index|
  user_id = index % 2 == 0 ? demo.id : friend.id
  Message.create(body: message, messageable_id: chat.id, messageable_type: "Chat", user_id: user_id)
end
puts "[Seed] messages"
   