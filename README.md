# Discoparty (Reloaded)

Bored to handle music when partying ? When people come to you to ask for a given track ?

Then you'll <3 Discoparty !

## How to use
You first need to create a playlist just by naming it (currently deployed on http://discoparty.herokuapp.com), start adding some tracks, and click play !

Then you can share the link above the playlist title to everybody in the party.
Using this link, everyone will be able to add new tracks and upvote for some of them (it will reorder the playlist), and you'll not have to handle it anymore :)

## Technologies
Rails / React / Webpack / ActionCable

## Launch Discoparty locally
Needed dependencies :
* Postgresql
* Bundler
* Yarn

Once cloned, launch
* `bundle install`
* `yarn`
* `rails db:create db:migrate`

And for the webserver
* `bundle exec foreman start -f Procfile.dev`

Foreman will launch the web server and webpack at the same time

Then go on `http://localhost:3000` and enjoy !

## Licence
MIT, Feel free to open PR, issues, etc.
