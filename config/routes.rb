Rails.application.routes.draw do
  resources :playlists, only: [:new, :create, :show]

  namespace :api do
    namespace :v1 do
      resource :search, only: :show
      resources :playlists, only: [:show] do
        resources :tracks, only: [:index, :create, :update, :destroy]
      end

      resources :tracks, only: [] do
        member do
          post :vote, to: 'tracks#upvote'
          delete :vote, to: 'tracks#downvote'
        end
      end
    end
  end

  root to: 'playlists#new'
end
