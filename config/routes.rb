Rails.application.routes.draw do
  resources :playlists, only: [:new, :create, :show]

  root to: 'playlists#new'
end
