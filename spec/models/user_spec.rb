require 'rails_helper'

describe User do
  it { should have_many(:playlists) }

  describe 'before create callback' do
    it 'sets an uuid in user instance' do
      user = create(:user)

      expect(user.uuid).not_to be_nil
    end
  end
end
