import {Relationships, useRequest} from "../Constants";

class Relationship {
    constructor(user, member, relationship) {
        this.user = user;
        this.member = member;
        this.relationship = relationship;
        this.baseUrl = 'https://intense-refuge-49089.herokuapp.com';
    }

    getUser() {
        return this.user;
    }

    getMember() {
        return this.member;
    }

    getRelationship() {
        return this.relationship;
    }

    userLikesMember() {
        return likes(this.user, this.member);
    }

    memberLikesUser() {
        return likes(this.member, this.user);
    }

    likes(source, target) {
        const {data, error} = useRequest(this.admirersEndpointFor(target));
        if (error) {
            console.log("Retrieval error for admirers: ", error);
        } else {
            return data.filter(admirer => admirer.profileId === source.profileId).length > 0;
        }
    }

    admirersEndpointFor(member) {
        return '/api/profile/get-admirers/' + member.profileId;
    }
}

function likes(source, target) {
    const {data, error} = useRequest(this.admirersEndpointFor(target));
    if (error) {
        console.log("Retrieval error for admirers: ", error);
    } else {
        return data.filter(admirer => admirer.profileId === source.profileId).length > 0;
    }
}

export default Relationship