require 'rails_helper'

describe User do
  it { should have_many(:playlists).dependent(:destroy) }
  it { should have_many(:upvotes).dependent(:destroy) }
end
